SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<vd.zinovev>
-- Create date: <25.05.2022>
-- Description:	Импорт веб накладных клиента агента
-- =============================================
CREATE PROCEDURE wwwClientImportWebWbs

@Ord_No int,
-----------------------------
@S_City varchar(60), 
@S_Name varchar(50),
@S_Tel varchar(50),
@S_Co varchar(90),
@S_Adr varchar(200),
@S_Ref varchar(300),
@S_Mail varchar(200),
---------------------------------
@R_City varchar(60),
@R_Name varchar(50),
@R_Tel varchar(50),
@R_Co varchar(90),
@R_Adr varchar(200),
@R_Ref varchar(300),
@R_Mail varchar(200),
-----------------------------
@WT float,
@VOL_WT float,
@PCS int,
@T_PAC varchar(11),--Документ/Не документ
----------------------------
@User_In varchar (50),
@Descr varchar(500) = null,
@Inssum float = 0,
@Metpaym varchar(9) = 'По счету',--По счету/Наличными
@Payr varchar(11) = 'Отправитель',--Отправитель/Получатель
@wbsource varchar(50) = 'webClient',
@agentID int = null,
@result varchar(400) OUTPUT
AS

declare @S_City_ID int, @R_City_ID int, @activ int, @ORG varchar(5), @DEST varchar(5), @T_PAC_INT int, @Payr_int int 
if @S_Mail='' set @S_Mail=null
if @R_Mail='' set @R_Mail=null
if @T_PAC = 'Документ' set @T_PAC_INT = 1 else set @T_PAC_INT = 0
if @Metpaym = 'Наличными' set @Metpaym = 'CSH' else set @Metpaym  = 'INV'
if @Payr = 'Отправитель' set @Payr_int = 1 else set @Payr_int = 2
/*------------------------Завершающий вызов процедуры с пустыми параметрами------------------------------------*/
IF @result = 'last'
BEGIN


    return;
END

declare @procName varchar(100)
set @procName = OBJECT_NAME(@@PROCID)
exec wwwLogProcUse @procName = @procName, @aUser = @User_In

/*-------------------------------------------------------------------------------------------------------------*/

if (select 1 from RegOrders where ROrdNum = @Ord_No) != 1
BEGIN
select @result = 'Заказ с номером: ' + CONVERT(varchar(50),@Ord_No) + ' не внесен в систему!'
return
END
select @S_City_ID = cityID, @activ = cityActive, @ORG = cityCode from vCity where city = @S_City
if @S_City_ID is NULL
begin
select @result = 'Не верно задано имя города отправителя: ' + @S_City
return
end
if @activ = 0
begin
select @result = 'Город отправителя не обслуживается: ' + @S_City
return
end
select @R_City_ID = cityID, @activ = cityActive, @DEST = cityCode from vCity where city = @R_City
if @R_City_ID is NULL
begin
select @result = 'Не верно задано имя города получателя: ' + @R_City
return
end
if @activ = 0
begin
select @result = 'Город получателя не обслуживается: ' + @R_City
return
end
begin
INSERT INTO wwwClientWB
           ([Wb_No]
           ,[Ord_No]
           ,S_City_ID
           ,[ORG]
           ,[S_City]
           ,[S_Name]
           ,[S_Tel]
           ,[S_Co]
           ,[S_Adr]
           ,[S_Ref]
           ,[S_Mail]
           ,R_City_ID
           ,[DEST]
           ,[R_City]
           ,[R_Name]
           ,[R_Tel]
           ,[R_Co]
           ,[R_Adr]
           ,[R_Ref]
           ,[R_Mail]
           ,[User_IN]
           ,[Date_IN]
           ,[WT]
           ,[VOL_WT]
           ,[PCS]
           ,[T_PAC]
		   ,Descr
		   ,Inssum
		   ,Metpaym
		   ,Payr
       ,wbsource
       ,agentID)
     VALUES
           (''
           ,@Ord_No
           ,@S_City_ID
           ,@ORG
           ,@S_City
           ,@S_Name
           ,@S_Tel
           ,@S_Co
           ,@S_Adr
           ,@S_Ref
           ,@S_Mail
           ,@R_City_ID
           ,@DEST
           ,@R_City
           ,@R_Name
           ,@R_Tel
           ,@R_Co
           ,@R_Adr
           ,@R_Ref
           ,@R_Mail
           ,@User_IN
           ,GETDATE()
           ,@WT
           ,@VOL_WT
           ,@PCS
           ,@T_PAC_INT
		   ,@Descr
		   ,@Inssum
		   ,@Metpaym
		   ,@Payr_int
       ,@wbsource
       ,@agentID)
        
select @result = 1
end

grant execute on wwwClientImportWebWbs to pod
