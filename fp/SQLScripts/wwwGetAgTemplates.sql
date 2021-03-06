USE [ALERT_F]
GO
/****** Object:  StoredProcedure [dbo].[wwwGetAgTemplates]    Script Date: 04/19/2013 12:43:47 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[wwwGetAgTemplates]
@agentID int
AS
if @agentID is null return 
SELECT t.[ID]
      ,t.[TemplateName]
      ,t.[agentID]
      --,t.[ORG]
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
      --,t.[DEST]
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
    
  FROM AgOrdersTemplate t
  where t.agentID=@agentID
GO
GRANT EXECUTE ON [dbo].[wwwGetAgTemplates] TO [pod] AS [dbo]
GO
