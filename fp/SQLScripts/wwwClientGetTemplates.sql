USE [ALERT_F]
GO
/****** Object:  StoredProcedure [dbo].[wwwClientGetTemplates]    Script Date: 10/01/2022 13:54:18 ******/
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
      ,orgSate = (select c.state from  vCity c where c.cityId=t.ORGCity)
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
      ,destState=(select c.state from  vCity c where c.cityId=t.DESTCity)
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
