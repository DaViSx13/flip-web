USE [ALERT_F]
GO
/****** Object:  StoredProcedure [dbo].[wwwGetExCodes]    Script Date: 09/01/2012 08:49:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


ALTER procedure [dbo].[wwwGetExCodes]
as
select --*, 
ExCode, ExDesc=ExCode+' - '+ExDesc, /*Actions,*/ DTDmod, WNDmode ,Fault
from EXCEP 
where Apply <> 1
order by ExCode


