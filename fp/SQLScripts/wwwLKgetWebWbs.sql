USE [ALERT_F]
GO
/****** Object:  StoredProcedure [dbo].[wwwLKgetWebWbs]    Script Date: 07/15/2023 16:47:45 ******/
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

SELECT c.[id]
      ,c.[wb_no] as wb_no
      ,c.[ord_no]
      ,c.s_city_id  
      ,c.[s_city] as org
      ,c.[s_name]
      ,c.[s_tel]
      ,c.[s_co]
      ,c.[s_adr]
      ,c.[s_ref]
      ,c.[s_mail]
      ,c.r_city_id
      ,c.[r_city] as dest
      ,c.[r_name]
      ,c.[r_tel]
      ,c.[r_co]
      ,c.[r_adr]
      ,c.[r_ref]
      ,c.[r_mail]
      ,c.[user_in]
      ,c.[date_in]
      ,c.[WT] 
      ,c.[vol_wt]
      ,c.[pcs]
      ,c.[t_pac] as type   
	  ,c.descr
	  ,c.inssum
	  ,r.payr
      ,metpaym = case
      when r.[PayType] = 0 then 'INV'
      else 'CSH'
      end
	  ,r.courdate as orderDate
	  ,web_count = (select count(1) from Main main where main.Wb_No = c.Wb_No)
FROM wwwClientWB c
left join RegOrders r
on c.Ord_No = r.ROrdNum
where [Date_IN] >= @bDate and [Date_IN] < @eDate
  and (@agID = -1 or ([User_IN]=@aUser))
  and wbsource = 'webLK'
order by c.id desc