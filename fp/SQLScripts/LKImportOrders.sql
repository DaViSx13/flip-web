-- ================================================
-- Template generated from Template Explorer using:
-- Create Procedure (New Menu).SQL
--
-- Use the Specify Values for Template Parameters 
-- command (Ctrl-Shift-M) to fill in the parameter 
-- values below.
--
-- This block of comments will not be included in
-- the definition of the procedure.
-- ================================================
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<VD.ZINOVEV>
-- Create date: <28.09.2023>
-- Description:	<Импорт заказов из ЛК Москвы>
-- =============================================
CREATE PROCEDURE ImportRegOrders
@ORG varchar(60), 
@CName varchar(60),
@Address varchar(70),
@ContName varchar(50),
@ContPhone varchar(50),
@ContMail varchar(50) = null,
@OrgRems varchar(1000),
@DEST varchar(60),
@DName varchar(60),
@DAdr varchar(70),
@DContName varchar(50),
@DContPhone varchar(50),
@DContMail varchar(50) = null,
@DESTRems varchar(1000) = null,
@Packs int,
@Wt decimal(18,2),
@VolWt decimal(18,2) = 0.0,
@Payr varchar (50),
@UserIn varchar (50),
@CourDate datetime,
@CourTimeF time,
@CourTimeT time,
@Descr varchar(2000),
@result varchar(400) OUTPUT
AS
BEGIN
if @ContMail='' set @ContMail=null
if @DContMail='' set @DContMail=null
if @CourDate='' set @CourDate=null
if @CourTimeF='' set @CourTimeF=null
if @CourTimeT='' set @CourTimeT=null
declare @orgID int, @destID int, @mail varchar(max), @activ int
select @orgID = NULL, @destID = NULL
SELECT @CourDate = CAST(@CourDate AS date)
/*------------------------Завершающий вызов процедуры с пустыми параметрами------------------------------------*/
IF @result = 'last'
BEGIN
select @mail = OrgRems from #import
/*EXEC msdb.dbo.sp_send_dbmail
    @profile_name = 'forReporting',
    @recipients = 'lovite@flippost.com',
    @blind_copy_recipients = 'DaViSx13@gmail.com',    
    @body = @mail,
    @exclude_query_output = 1,
    @subject = 'Приняты новые заказы';*/
    return;
END

declare @procName varchar(100)
set @procName = OBJECT_NAME(@@PROCID)
exec wwwLogProcUse @procName = @procName, @aUser = @UserIn

/*-------------------------------------------------------------------------------------------------------------*/
if @CourDate <= GETDATE()-1
BEGIN
select @result = 'Дата не должна быть меньше текущей: ' + convert(varchar(15), @CourDate, 104)
return
END
select @orgID = cityID, @activ = cityActive from vCity where city = @ORG
if @orgID is NULL
begin
select @result = 'Не верно задано имя города отправителя: ' + @ORG
return
end
if @activ = 0
begin
select @result = 'Город отправителя не обслуживается: ' + @ORG
return
end
select @destID = cityID, @activ = cityActive from vCity where city = @DEST
if @destID is NULL
begin
select @result = 'Не верно задано имя города получателя: ' + @DEST
return
end
if @activ = 0
begin
select @result = 'Город получателя не обслуживается: ' + @ORG
return
end
begin
INSERT INTO RegOrders (
ORGCity,--1
ORG, --2
CName,--3
[Address], --4
ContName,--5
ContPhone,--6
ContMail,--7
OrgRems,--8
DESTCity,--9
DEST,--10
DName,--11
DAdr,--12
DContName,--13
DContPhone,--14
DContMail,--15
DESTRems,--16
[Type],--17
Packs,--18
Wt,--19
VolWt,--20
CourDate,--21
CourTimeF,--22
CourTimeT,--23
Payr,--24
PCACC,
[Status],
FrmID,
UserIn,
CurId,
ContentDescr
 )
VALUES (
@orgID, --1
(select c.Code from N_City c where c.id=@orgID),--2
@CName,--3
@Address,--4
@ContName,--5
@ContPhone,--6
@ContMail,--7
@OrgRems,--8
@destID,--9
(select c.Code from N_City c where c.id=@destID),--10
@DName,--11
@DAdr,--12
@DContName,--13
@DContPhone,--14
@DContMail,--15
@DESTRems,--16
0,--17
@Packs,--18
@Wt,--19
@VolWt,--20
@CourDate,--21
@CourTimeF,--22
@CourTimeT,--23
1,--24
@Payr,
0,
4,
@UserIn,
0,
@Descr
       )
select @mail= OrgRems from #import
select @mail= @mail + char(13) + char(10) + 'Принят новый заказ №'+convert(varchar,ROrdNum)
+ ' Город отправления: ' +(select s.RusName from N_City s where s.id=ORGCity)+
char(13)+ 'Город получения: ' +(select s.RusName from N_City s where s.id=DESTCity)+
char(13)+ 'Внесено агентом: ' + (select p.PartName from Partinf p where p.PartCode=PCACC)
		+ ' (' + (select p.PartLoc from Partinf p where p.PartCode=PCACC)+ ')'
from AgOrders
where ROrdNum=SCOPE_IDENTITY() 
insert into #import(
OrgRems
)
values(
@mail
)        
select @result = 1
end
END
GO

GRANT EXECUTE ON ImportRegOrders TO POD