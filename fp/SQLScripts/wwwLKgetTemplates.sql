USE [ALERT_F]
GO
/****** Object:  StoredProcedure [dbo].[wwwLKgetTemplates]    Script Date: 03/31/2021 01:09:15 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER procedure [dbo].[wwwLKgetTemplates]
@clientID varchar(10)
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
      , destState = (select vCity.state from  vCity where vCity.cityId = t.DESTCity)
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

