USE [ALERT_F]
GO
/****** Object:  StoredProcedure [dbo].[wwwLKgetClients]    Script Date: 03/26/2020 23:51:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER procedure [dbo].[wwwLKgetClients]
as
select k.CACC as partcode, k.Loc as partloc, k.C_Name as partname from Klient k
--where DateShtdn is null
order by k.C_Name

