USE [ALERT_F]
GO
/****** Object:  StoredProcedure [dbo].[wwwLKgetWebWbs]    Script Date: 06/03/2021 22:35:00 ******/
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
      ,с.[wb_no]
      ,с.[ord_no]
      ,с.s_city_id  
      ,с.[s_city] as org
      ,с.[s_name]
      ,с.[s_tel]
      ,с.[s_co]
      ,с.[s_adr]
      ,с.[s_ref]
      ,с.[s_mail]
      ,с.r_city_id
      ,с.[r_city] as dest
      ,с.[r_name]
      ,с.[r_tel]
      ,с.[r_co]
      ,с.[r_adr]
      ,с.[r_ref]
      ,с.[r_mail]
      ,с.[user_in]
      ,с.[date_in]
      ,с.[WT] 
      ,с.[vol_wt]
      ,с.[pcs]
      ,с.[t_pac] as type   
	  ,с.descr
	  ,с.inssum
	  ,r.payr
      ,metpaym = case
      when r.[PayType] = 0 then 'INV'
      else 'CSH'
      end
	  ,r.courdate as orderDate
FROM wwwClientWB с
left join RegOrders r
on с.Ord_No = r.ROrdNum
  where [Date_IN] >= @bDate and [Date_IN] < @eDate
  and (@agID = -1 or ([User_IN]=@aUser))
  and wbsource = 'webLK'
  order by id desc