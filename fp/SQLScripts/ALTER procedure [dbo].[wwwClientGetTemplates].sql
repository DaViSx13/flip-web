USE [ALERT_F]
GO
/****** Object:  StoredProcedure [dbo].[wwwClientGetTemplates]    Script Date: 05/12/16 15:03:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER procedure [dbo].[wwwClientGetTemplates]
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
    
  FROM wwwClientTemplate t
  where t.clientID=@clientID
