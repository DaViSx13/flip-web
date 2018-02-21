USE [ALERT_F]
GO

/****** Object:  StoredProcedure [dbo].[wwwClientSetWb]    Script Date: 02/21/2018 12:32:58 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[wwwClientSetWb]') AND type in (N'P', N'PC'))
DROP PROCEDURE [dbo].[wwwClientSetWb]
GO

USE [ALERT_F]
GO

/****** Object:  StoredProcedure [dbo].[wwwClientSetWb]    Script Date: 02/21/2018 12:32:58 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE procedure [dbo].[wwwClientSetWb]
	@ID int,
	@Wb_No varchar(50),
	@Ord_No int,
	@ORG varchar(5),
	@S_City varchar(200),
	@S_Name varchar(20),
	@S_Tel varchar(50),
	@S_Co varchar(40),
	@S_Adr varchar(200),
	@S_Ref varchar(300),
	@S_Mail varchar(200),
	@DEST varchar(5),
	@R_City varchar(200),
	@R_Name varchar(20),
	@R_Tel varchar(50),
	@R_Co varchar(40),
	@R_Adr varchar(200),
	@R_Ref varchar(300),
	@R_Mail varchar(200),
	@User_IN varchar(50),
	--@Date_IN datetime,
	@WT float,
	@VOL_WT float,
	@PCS int,
	@T_PAC int
AS
BEGIN TRY
BEGIN TRAN
if @S_Mail='' set @S_Mail=null
if @R_Mail='' set @R_Mail=null
if @T_PAC = 0 set @T_PAC=null else set @T_PAC=null
if @Wb_No = '' set @Wb_No = 'test'


if @ID >0
begin 

if not exists(select 1 from wwwClientWB where ID = @ID /*and Status > 0*/) 
	  RAISERROR ('Ошибка БД: Не найдена запись в таблице веб накладных!',
               16, -- Severity.
               1 -- State.
               );


UPDATE [ALERT_F].[dbo].[wwwClientWB]
   SET [Wb_No] = @Wb_No
      ,[Ord_No] = @Ord_No
      ,[ORG] = @ORG
      ,[S_City] = @S_City
      ,[S_Name] = @S_Name
      ,[S_Tel] = @S_Tel
      ,[S_Co] = @S_Co
      ,[S_Adr] = @S_Adr
      ,[S_Ref] = @S_Ref
      ,[S_Mail] = @S_Mail
      ,[DEST] = @DEST
      ,[R_City] = @R_City
      ,[R_Name] = @R_Name
      ,[R_Tel] = @R_Tel
      ,[R_Co] = @R_Co
      ,[R_Adr] = @R_Adr
      ,[R_Ref] = @R_Ref
      ,[R_Mail] = @R_Mail
      ,[User_IN] = @User_IN
      ,[Date_IN] = GETDATE()
      ,[WT] = @WT
      ,[VOL_WT] = @VOL_WT
      ,[PCS] = @PCS
      ,[T_PAC] = @T_PAC
 WHERE ID=@ID 

select ID=@ID
end
else
begin
INSERT INTO [ALERT_F].[dbo].[wwwClientWB]
           ([Wb_No]
           ,[Ord_No]
           ,[ORG]
           ,[S_City]
           ,[S_Name]
           ,[S_Tel]
           ,[S_Co]
           ,[S_Adr]
           ,[S_Ref]
           ,[S_Mail]
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
           ,[T_PAC])
     VALUES
           (@Wb_No
           ,@Ord_No
           ,@ORG
           ,@S_City
           ,@S_Name
           ,@S_Tel
           ,@S_Co
           ,@S_Adr
           ,@S_Ref
           ,@S_Mail
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
           ,@T_PAC)
      

select ID=SCOPE_IDENTITY()
end

COMMIT TRAN
END TRY
BEGIN CATCH
	ROLLBACK TRAN 
	DECLARE @ErrorMessage NVARCHAR(4000);	
	SELECT @ErrorMessage = 'Error in wwwClientSetWb: '+ ERROR_MESSAGE()  
    RAISERROR (@ErrorMessage,
           16,
           1);
            
END CATCH

GO
GRANT EXECUTE ON [dbo].[wwwClientSetWb] TO [pod] AS [dbo]
GO


