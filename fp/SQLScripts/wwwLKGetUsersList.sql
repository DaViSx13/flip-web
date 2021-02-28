USE [ALERT_F]
GO
/****** Object:  StoredProcedure [dbo].[wwwLKGetUsersList]    Script Date: 02/28/2021 18:50:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		VD.ZINOVEV
-- Create date: 28.02.2020
-- Description:	Procedure returns data for LK MOSCOW agent combobox
-- =============================================
ALTER PROCEDURE [dbo].[wwwLKGetUsersList]
AS
BEGIN
	SELECT
			k.CACC AS partcode,
			k.Loc AS partloc,
			k.C_Name AS partname
	from Klient k
	join wwwLKUser u
	on u.ClientID = k.CACC
END
