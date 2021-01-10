USE [ALERT_F]
GO
/****** Object:  StoredProcedure [dbo].[wwwLKgetWebWbs]    Script Date: 01/10/2021 20:20:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


ALTER procedure [dbo].[wwwLKgetWebWbs]
@period varchar(10) = null,
@from varchar(8) = null,
@to varchar(8) = null,
@clientID varchar(10)
AS



if @clientID is null return
if ISNULL(ltrim(rtrim(@period)), '') = '' set @period = left(CONVERT(varchar(50), GETDATE(), 112), 6) + '01'

declare @bDate date, @eDate date, @agID int
declare @aUser varchar(50)

select  @aUser = aUser from wwwLKUser where clientID = @clientID
BEGIN
IF @from IS NULL
	set @bDate = @period+'01'
ELSE
	set @bDate = CONVERT(DATE, @from, 112);
END

BEGIN
IF @to IS NULL
	set @eDate = DATEADD(m,1,@bDate)
--select @bDate, @eDate
ELSE
	set @eDate = DATEADD(DAY, 1, CONVERT(DATE,@to, 112));
END



 
SELECT [id]
      ,wwwClientWB.[wb_no]
      ,wwwClientWB.[ord_no]
      ,wwwClientWB.s_city_id  
      ,wwwClientWB.[s_city] as org
      ,wwwClientWB.[s_name]
      ,wwwClientWB.[s_tel]
      ,wwwClientWB.[s_co]
      ,wwwClientWB.[s_adr]
      ,wwwClientWB.[s_ref]
      ,wwwClientWB.[s_mail]
      ,wwwClientWB.r_city_id
      ,wwwClientWB.[r_city] as dest
      ,wwwClientWB.[r_name]
      ,wwwClientWB.[r_tel]
      ,wwwClientWB.[r_co]
      ,wwwClientWB.[r_adr]
      ,wwwClientWB.[r_ref]
      ,wwwClientWB.[r_mail]
      ,wwwClientWB.[user_in]
      ,wwwClientWB.[date_in]
      ,wwwClientWB.[WT] 
      ,wwwClientWB.[vol_wt]
      ,wwwClientWB.[pcs]
      ,wwwClientWB.[t_pac] as type   
	  ,wwwClientWB.descr
	  ,wwwClientWB.inssum
	  ,wwwClientWB.payr
	  ,wwwClientWB.metpaym
	  ,RegOrders.DateIn as orderDate
FROM wwwClientWB
left join RegOrders
on wwwClientWB.Ord_No = RegOrders.ROrdNum
  where [Date_IN] >= @bDate and [Date_IN] < @eDate
  and (@agID = -1 or ([User_IN]=@aUser))
  order by id desc
  select wwwClientWB.Wb_No from wwwClientWB
  select * from RegOrders where RegOrders.Wb_no in (select wwwClientWB.Wb_No from wwwClientWB)


