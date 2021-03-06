USE [ALERT_F]
GO
/****** Object:  StoredProcedure [dbo].[wwwClientGetWebWbs]    Script Date: 06/03/2021 23:43:25 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


ALTER procedure [dbo].[wwwClientGetWebWbs]
@period varchar(10) = null,
@from varchar(8) = null,
@to varchar(8) = null,
@clientID int
AS



if @clientID is null return
if ISNULL(ltrim(rtrim(@period)), '') = '' set @period = left(CONVERT(varchar(50), GETDATE(), 112), 6) + '01'

declare @bDate date, @eDate date, @agID int
declare @aUser varchar(50)

select  @aUser = aUser from wwwClientUser where userID = @clientID

BEGIN
	IF @from IS NULL
		set @bDate = @period+'01'
	ELSE
		set @bDate = CONVERT(DATE, @from, 112)
END

BEGIN
	IF @to IS NULL
		set @eDate = DATEADD(m,1,@bDate)
	ELSE
		SET @eDate = DATEADD(DAY, 1, CONVERT(DATE, @to, 112))	
END

SELECT [id]
      ,c.[Wb_no]
      ,[ord_no]
      ,s_city_id  
      ,[s_city] as org
      ,[s_name]
      ,[s_tel]
      ,[s_co]
      ,[s_adr]
      ,[s_ref]
      ,[s_mail]
      ,r_city_id
      ,[r_city] as dest
      ,[r_name]
      ,[r_tel]
      ,[r_co]
      ,[r_adr]
      ,[r_ref]
      ,[r_mail]
      ,[user_in]
      ,[date_in]
      ,c.[Wt]
      ,[vol_wt]
      ,[pcs]
      ,[inssum]
	  ,r.Payr
      ,metpaym = case
      when r.[PayType] = 0 then 'INV'
      else 'CSH'
      end
      ,[t_pac] as type  
      
  FROM wwwClientWB c
  join AgOrders r
  on r.ROrdNum = c.Ord_No
  where c.[Date_IN] >= @bDate and c.[Date_IN] < @eDate
  and (@agID = -1 or (c.[User_IN]=@aUser))
  and wbsource = 'webClient'
  order by id desc



