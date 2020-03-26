USE [ALERT_F]
GO
/****** Object:  StoredProcedure [dbo].[wwwLKgetWebWbs]    Script Date: 03/26/2020 23:54:23 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


ALTER procedure [dbo].[wwwLKgetWebWbs]
@period varchar(10), @clientID varchar(10)
AS



if @clientID is null return
if ISNULL(ltrim(rtrim(@period)), '') = '' set @period = left(CONVERT(varchar(50), GETDATE(), 112), 6) + '01'

declare @bDate date, @eDate date, @agID int
declare @aUser varchar(50)

select  @aUser = aUser from wwwLKUser where clientID = @clientID

set @bDate = @period+'01'

set @eDate = DATEADD(m,1,@bDate)
 
SELECT [id]
      ,[wb_no]
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
      ,[wt]
      ,[vol_wt]
      ,[pcs]
      ,[t_pac] as type   
	  ,descr
	  ,inssum
	  ,payr
	  ,metpaym
  FROM wwwClientWB
  where [Date_IN] >= @bDate and [Date_IN] < @eDate
  and (@agID = -1 or ([User_IN]=@aUser))
  order by id desc




