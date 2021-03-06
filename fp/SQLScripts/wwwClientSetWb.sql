USE [ALERT_F]
GO
/****** Object:  StoredProcedure [dbo].[wwwClientSetWb]    Script Date: 06/06/2021 11:51:57 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER procedure [dbo].[wwwClientSetWb]
	@ID int,
	@Wb_No varchar(50)= '',
	@Ord_No int,
	--@ORG varchar(5),
	@S_City_ID int,
	@S_Name varchar(50),
	@S_Tel varchar(50),
	@S_Co varchar(90),
	@S_Adr varchar(200),
	@S_Ref varchar(300),
	@S_Mail varchar(200),
	--@DEST varchar(5),
	@R_City_ID int,
	@R_Name varchar(50),
	@R_Tel varchar(50),
	@R_Co varchar(90),
	@R_Adr varchar(200),
	@R_Ref varchar(300),
	@R_Mail varchar(200),
	@User_IN varchar(50),
	--@Date_IN datetime,
	@WT float,
	@VOL_WT float,
	@PCS int,
	@T_PAC int,
	@Descr varchar(500) = null,
	@Inssum float = 0,	
	@wbsource varchar(50),
	@agentID int = null
AS
declare @ORG varchar(5), @S_City varchar(200), @DEST varchar(5), @R_City varchar(200)
BEGIN TRY
BEGIN TRAN
if @S_Mail='' set @S_Mail=null
if @R_Mail='' set @R_Mail=null
--if @T_PAC = 0 set @T_PAC=null else set @T_PAC=null
--if @Wb_No = '' set @Wb_No = 'test'

select @ORG = c.Code, @S_City = c.RusName from N_City c where c.id=@S_City_ID
select @DEST = c.Code, @R_City = c.RusName from N_City c where c.id=@R_City_ID

/*if @clientID is not null and @clientID <> '' 
  begin
  select 
      @CACC = CACC
    , @UserIn = aUser
    , @Payr = agentID
  from wwwClientUser where userID = @clientID*/



if @ID >0
begin 

if not exists(select 1 from wwwClientWB where ID = @ID /*and Status > 0*/) 
	  RAISERROR ('Ошибка БД: Не найдена запись в таблице веб накладных!',
               16, -- Severity.
               1 -- State.
               );


UPDATE wwwClientWB
   SET [Wb_No] = @Wb_No
      ,[Ord_No] = @Ord_No
      ,S_City_ID = @S_City_ID
      ,[ORG] = @ORG
      ,[S_City] = @S_City
      ,[S_Name] = @S_Name
      ,[S_Tel] = @S_Tel
      ,[S_Co] = @S_Co
      ,[S_Adr] = @S_Adr
      ,[S_Ref] = @S_Ref
      ,[S_Mail] = @S_Mail
      ,R_City_ID=@R_CIty_ID
      ,[DEST] = @DEST
      ,[R_City] = @R_City
      ,[R_Name] = @R_Name
      ,[R_Tel] = @R_Tel
      ,[R_Co] = @R_Co
      ,[R_Adr] = @R_Adr
      ,[R_Ref] = @R_Ref
      ,[R_Mail] = @R_Mail
   --   ,[User_IN] = @User_IN
  --    ,[Date_IN] = GETDATE()
      ,[WT] = @WT
      ,[VOL_WT] = @VOL_WT
      ,[PCS] = @PCS
      ,[T_PAC] = @T_PAC
	  ,Descr = @Descr
	  ,Inssum = @Inssum
 WHERE ID=@ID 

select ID=@ID
end
else
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
       ,wbsource
       ,agentID)
     VALUES
           (@Wb_No
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
           ,@T_PAC
		   ,@Descr
		   ,@Inssum		  
       ,@wbsource
       ,@agentID)
      

select ID, Wb_No from wwwClientWB where ID=SCOPE_IDENTITY()
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


