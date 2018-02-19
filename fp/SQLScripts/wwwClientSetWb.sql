USE [ALERT_F]
GO

/****** Object:  StoredProcedure [dbo].[wwwClientSetWb]    Script Date: 02/19/2018 14:15:51 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


create procedure [dbo].[wwwClientSetWb]
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
	@WT float,
	@VOL_WT float,
	@PCS int,
	@T_PAC varchar(3)
AS
BEGIN TRY
BEGIN TRAN
if @S_Mail='' set @S_Mail=null
if @R_Mail='' set @R_Mail=null

if @ID >0
begin 

if not exists(select 1 from wwwClientWB where ID = @ID /*and Status > 0*/) 
	  RAISERROR ('Ошибка БД: Не найдена запись в таблице веб накладных!',
               16, -- Severity.
               1 -- State.
               );

Update wwwClientWB 
set Wb_No=@Wb_No, Ord_No=@Ord_No
where ID=@ID 

select ID=@ID
end
else
begin
INSERT INTO wwwClientWB (
Wb_No,
Ord_No
 )VALUES (
@Wb_No,
@Ord_No
 )
      

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


