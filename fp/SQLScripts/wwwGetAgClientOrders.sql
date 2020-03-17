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
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE wwwGetAgClientOrders
@period varchar(10), @agentID int
AS
BEGIN
if @agentID is null return
if ISNULL(ltrim(rtrim(@period)), '') = '' set @period = left(CONVERT(varchar(50), GETDATE(), 112), 6) + '01'

declare @bDate date, @eDate date, @agID int
declare @CACC varchar(50), @aUser varchar(50)

select @CACC = CACC, @aUser = aUser from wwwClientUser where agentID = @agentID

--set @agID = @agentID -- 54
set @bDate = @period+'01'
--set @eDate = dateadd(d, -1, DATEADD(m,1,@bDate))
set @eDate = DATEADD(m,1,@bDate)
 
SELECT [ROrdNum]--
     ,ORGCity as org
      ,ORGCity=(select N_City.RusName from  N_City where N_City.id=ORGCity)--
      ,[CName]--
      ,[Address] as s_adr
      ,[ContName] as s_name
      ,[ContPhone] as s_tel
     -- ,[ContFax]
      ,[ContMail] as s_mail
     -- ,[OrgRems]
      ,[type]
      ,[Packs]--
      ,[Wt]--
      ,[VolWt]--
     -- ,[Amt]
     -- ,[DEST]
      ,DESTCity=(select N_City.RusName from  N_City where N_City.id=DESTCity)--
      ,[DName]--
      --,[DAdr]
      --,[DContName]
      --,[DContPhone]
     -- ,[DContFax]
      --,[DContMail]
      --,[DESTRems]
      ,[datein]--
	  ,[status]= 
	case
	when Wb_no is null then
		case
			when RegOrders.NeedDel = 1 then 'отменен'
			when RegOrders.Wb_no is NULL and (RegOrders.NeedDel is NULL or RegOrders.NeedDel=0) and DATEDIFF(dd, dbo.addWDays(courDate, 2), getDate())>0 then 'просрочено'
			when RegOrders.Status = 0  then 'заявлен'
			when RegOrders.Status = 1  then 'передан агенту'
			when RegOrders.Status = 2  then 'принят агентом'
			when RegOrders.Status = 4  then 'присвоен № нак.'
			when RegOrders.Status = 3  then 'отказ клиента'
		end
	else
		case --обратный порядок
			when (select tdd from Main m where m.Wb_No = RegOrders.Wb_no) is not null then 'доставлено'
			when exists(select 1 from MnfBdy mb where Wb_no = RegOrders.Wb_no and mb.MnfRefNo like 'MOW%') then 'отправлено'
			when exists(select 1 from MnfBdy mb where Wb_no = RegOrders.Wb_no and mb.MnfRefNo = '0') then 'на комплектовке'
		else 'присвоен № нак.'
		end
	end    
     ,[wb_no]
    
  FROM RegOrders
--  where [DateIn] between @bDate and @eDate
  where [DateIn] >= @bDate and [DateIn] < @eDate
  and (@agID = -1 or (UserIn=@aUser) and PCACC = @CACC)
  order by ROrdNum desc

END
GO
