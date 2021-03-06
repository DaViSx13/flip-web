USE [ALERT_F]
GO
/****** Object:  StoredProcedure [dbo].[wwwGetAgTemplates]    Script Date: 04/07/16 16:02:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[wwwClientGetTemplates]
@clientID int
AS
if @clientID is null return 
SELECT t.[tplID] as id
      ,t.[TemplateName]
      ,t.[clientID]

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
  go

  grant execute on [dbo].[wwwClientGetTemplates] to [pod]
  go