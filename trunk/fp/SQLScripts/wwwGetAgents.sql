USE [ALERT_F]
GO
/****** Object:  StoredProcedure [dbo].[wwwGetAgents]    Script Date: 09/07/2012 18:48:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER procedure [dbo].[wwwGetAgents]
as
select partcode, partloc, partname from Partinf
where DateShtdn is null
order by partname

