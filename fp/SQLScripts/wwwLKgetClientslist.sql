USE [ALERT_F]
GO
/****** Object:  StoredProcedure [dbo].[wwwLKgetClientslist]    Script Date: 03/26/2020 23:52:09 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER procedure [dbo].[wwwLKgetClientslist]
as
select k.CACC as partcode, k.Loc as partloc, k.C_Name as partname, displayname = k.C_Name +' ('+k.Loc+')'  from Klient k
where k.C_Name is not null and k.C_Name != '' and LEN(k.C_Name)>5
and k.Loc = 'MOW'
order by k.C_Name

