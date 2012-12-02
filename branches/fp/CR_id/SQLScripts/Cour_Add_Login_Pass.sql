USE [ALERT_F]
GO

ALTER TABLE dbo.CouriersTemp ADD
	MobileLogin varchar(20) NULL,
	MobilePassword varchar(10) NULL
go
	
/****** Object:  Trigger [dbo].[trInsCouriersTempLog]    Script Date: 11/21/2012 09:56:29 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER TRIGGER [dbo].[trInsCouriersTempLog] ON [dbo].[CouriersTemp] 
FOR UPDATE
AS
-- ∆”–Õ¿À ¬Õ≈—≈Õ»ﬂ »«Ã≈Õ≈Õ»… ¬ “¿¡À»÷”
 IF (select count(*) from inserted) =1 
 BEGIN
  declare @id int
  set @id =  ( select id from inserted )  
  exec al_create_Klient_tables  
if object_id('tempdb..#CouriersTempIns') is not null drop table #CouriersTempIns
if object_id('tempdb..#CouriersTempDel') is not null drop table #CouriersTempDel
SELECT [id],[Station], [EmpId], [EmpIdT], [CourType], [FirstName], [MiddleName], [SecondName], [DepartmID], [Post], [BirthDay], [Phone], [PhoneOff], [Mobile1], [Mobile2], [email], [SMS], [login], [HostName], [Pasport], [PaspSer], [PasportWho], [PasportData], [IndCode], [IndCodeWho], [IndCodeData], [LabourBook], [Address], [Hired], [Fired], [HiredOff], [FiredOff],  [Advnc], [SalCurId], [SalaryDate],  [Salary_], [SalaryOff_],[Salary], [SalaryOff], [AdvOff], [SalOffCurId], [SalaryOffDate], [Remarks], [Date_In], [User_In], [User_Edit], [Date_Edit], [CLev], [CrpID], [isOfficial], [ip_address], [act_date], [line_state], [ip_phone], [Is_Respon], [NotBePay],[EndList],[SocStrah],[type_],[cashLim],[DayLim],[WorkPhone],[icq],[ExamDate],[ExamCour],[ofLimit],[NoCalls],[IsVoin],[AllDocs],[2WN],[2Fire],[WLogin],[WPassw],[DogNo],[FindType],[PrtgId],[Sex],[SecondName_ua],[FirstName_ua],[MiddleName_ua],[ResumeFile],[FStatus], [MobileLogin], [MobilePassword] into #CouriersTempIns from Inserted
SELECT [id],[Station], [EmpId], [EmpIdT], [CourType], [FirstName], [MiddleName], [SecondName], [DepartmID], [Post], [BirthDay], [Phone], [PhoneOff], [Mobile1], [Mobile2], [email], [SMS], [login], [HostName], [Pasport], [PaspSer], [PasportWho], [PasportData], [IndCode], [IndCodeWho], [IndCodeData], [LabourBook], [Address], [Hired], [Fired], [HiredOff], [FiredOff],  [Advnc], [SalCurId], [SalaryDate],  [Salary_], [SalaryOff_],[Salary], [SalaryOff], [AdvOff], [SalOffCurId], [SalaryOffDate], [Remarks], [Date_In], [User_In], [User_Edit], [Date_Edit], [CLev], [CrpID], [isOfficial], [ip_address], [act_date], [line_state], [ip_phone], [Is_Respon], [NotBePay],[EndList],[SocStrah],[type_],[cashLim],[DayLim],[WorkPhone],[icq],[ExamDate],[ExamCour],[ofLimit],[NoCalls],[IsVoin],[AllDocs],[2WN],[2Fire],[WLogin],[WPassw],[DogNo],[FindType],[PrtgId],[Sex],[SecondName_ua],[FirstName_ua],[MiddleName_ua],[ResumeFile],[FStatus], [MobileLogin], [MobilePassword] into #CouriersTempDel from Deleted

declare @Name SysName, @colid smallint, @buf nvarchar(3000)

declare xx cursor local fast_forward for select name, column_id from sys.columns where object_id = ( SELECT object_id FROM sys.objects
             										    WHERE (name = 'CouriersTemp' )) and (name <> 'id' and name <> 'Rems' and name <> 'Wear' and name <> 'Photo')
open xx
fetch next from xx into @Name, @colid 
WHILE @@FETCH_STATUS = 0
BEGIN 
      set @buf = ' declare @old varchar(40), @New varchar(40) ' 
      set @buf = @buf + 
      ' set @Old = convert(varchar, (select ' + @Name + ' from #CouriersTempDel where id='+convert(varchar,@id)+'))'
      set @buf = @buf + 
      ' set @New = convert(varchar, (select ' + @Name + ' from #CouriersTempIns where id='+convert(varchar,@id)+'))' 
      set @buf = @buf + 
      ' if @old<>@new Insert CouriersTempLog (CourId,field,  OldVal, NewVal)values('+convert(varchar,@id)+','''+@Name+''', @Old, @New)'
--      select @buf
      exec ( @buf )
fetch next from xx into @Name, @colid 
END
close xx
DEALLOCATE xx
      delete #CouriersTempIns where [id]= @id
      delete #CouriersTempDel where [id]= @id
END
----------------------------
go

