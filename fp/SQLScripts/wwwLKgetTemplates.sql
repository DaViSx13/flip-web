USE [ALERT_F]
GO

/****** Object:  StoredProcedure [dbo].[wwwLKgetTemplates]    Script Date: 06/27/2018 13:35:03 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[wwwLKgetTemplates]') AND type in (N'P', N'PC'))
DROP PROCEDURE [dbo].[wwwLKgetTemplates]
GO

USE [ALERT_F]
GO

/****** Object:  StoredProcedure [dbo].[wwwLKgetTemplates]    Script Date: 06/27/2018 13:35:03 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE procedure [dbo].[wwwLKgetTemplates]
@clientID int
AS
if @clientID is null return 
SELECT t.[tplID] as id
      ,t.[TemplateName]
      ,t.[clientID]

      ,orgcode=t.ORGCity
      ,ORG=(select N_City.RusName from  N_City where N_City.id=t.ORGCity)
      ,t.[CACC]
      ,t.[CName]
      ,t.[Address]
      ,t.[ContName]
      ,t.[ContPhone]
      ,t.[ContFax]
      ,t.[ContMail]
      ,t.[OrgRems]

      ,destcode=t.DESTCity
      ,DEST=(select N_City.RusName from  N_City where N_City.id=t.DESTCity)
      ,t.[DCACC]
      ,t.[DName]
      ,t.[DAdr]
      ,t.[DContName]
      ,t.[DContPhone]
      ,t.[DContFax]
      ,t.[DContMail]
      ,t.[DESTRems]        
    
  FROM wwwLKTemplate t
  where t.clientID=@clientID

GO
grant execute on [wwwLKgetTemplates] to [pod]
go

