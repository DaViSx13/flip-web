USE [ALERT_F]
GO

/****** Object:  StoredProcedure [dbo].[wwwClientGetWebWbs]    Script Date: 02/26/2018 14:44:49 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[wwwClientGetWebWbs]') AND type in (N'P', N'PC'))
DROP PROCEDURE [dbo].[wwwClientGetWebWbs]
GO

USE [ALERT_F]
GO

/****** Object:  StoredProcedure [dbo].[wwwClientGetWebWbs]    Script Date: 02/26/2018 14:44:49 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE procedure [dbo].[wwwClientGetWebWbs]
@period varchar(10), @clientID int
AS



if @clientID is null return
if ISNULL(ltrim(rtrim(@period)), '') = '' set @period = left(CONVERT(varchar(50), GETDATE(), 112), 6) + '01'

declare @bDate date, @eDate date, @agID int
declare @aUser varchar(50)

select  @aUser = aUser from wwwClientUser where userID = @clientID

set @bDate = @period+'01'

set @eDate = DATEADD(m,1,@bDate)
 
SELECT [id]
      ,[wb_no]
      ,[ord_no]
      ,[org]
      ,[s_city]
      ,[s_name]
      ,[s_tel]
      ,[s_co]
      ,[s_adr]
      ,[s_ref]
      ,[s_mail]
      ,[dest]
      ,[r_city]
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
      ,[t_pac]    
  FROM wwwClientWB
  where [Date_IN] >= @bDate and [Date_IN] < @eDate
  and (@agID = -1 or ([User_IN]=@aUser))
  order by id desc

GO
GRANT EXECUTE ON [dbo].[wwwClientGetWebWbs] TO [pod] AS [dbo]
GO


