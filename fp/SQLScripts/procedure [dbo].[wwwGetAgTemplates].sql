USE [ALERT_F]
GO
/****** Object:  StoredProcedure [dbo].[wwwGetAgTemplates]    Script Date: 10/30/2017 12:12:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER procedure [dbo].[wwwGetAgTemplates]
@agentID int
AS
if @agentID is null return 
SELECT t.[ID]
      ,t.[TemplateName]
      ,t.[agentID]
      --,t.[ORG]
      ,orgcode=isnull((select N_City.id from  N_City where N_City.id=t.ORGCity and N_City.active = 1), 0)
      ,ORG=isnull((select N_City.RusName from  N_City where N_City.id=t.ORGCity and N_City.active = 1), '')
      ,t.[CACC]
      ,t.[CName]
      ,t.[Address]
      ,t.[ContName]
      ,t.[ContPhone]
      ,t.[ContFax]
      ,t.[ContMail]
      ,t.[OrgRems]
      --,t.[DEST]
      ,destcode=isnull((select N_City.id from  N_City where N_City.id=t.DESTCity and N_City.active = 1), 0)
      ,DEST=isnull((select N_City.RusName from  N_City where N_City.id=t.DESTCity and N_City.active = 1), '')
      ,t.[DCACC]
      ,t.[DName]
      ,t.[DAdr]
      ,t.[DContName]
      ,t.[DContPhone]
      ,t.[DContFax]
      ,t.[DContMail]
      ,t.[DESTRems]        
    
  FROM AgOrdersTemplate t
  where t.agentID=@agentID
