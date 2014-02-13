USE [ALERT_F]
GO

/****** Object:  UserDefinedFunction [dbo].[fn_CountMnfBdyForUserById]    Script Date: 02/13/2014 10:37:29 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[fn_CountMnfBdyForUserById]') AND type in (N'FN', N'IF', N'TF', N'FS', N'FT'))
DROP FUNCTION [dbo].[fn_CountMnfBdyForUserById]
GO

USE [ALERT_F]
GO

/****** Object:  UserDefinedFunction [dbo].[fn_CountMnfBdyForUserById]    Script Date: 02/13/2014 10:37:29 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



  
CREATE function [dbo].[fn_CountMnfBdyForUserById](@Wb_no varchar(11), @uname varchar(50))
returns  int
as
begin
return(
   SELECT   COUNT(*)    FROM [dbo].[MnfBdy] as bdy
    inner join dbo.[MnfHdr] as hdr     on bdy.MnfRefNo=hdr.MNFRefNo
    inner join [dbo].[wwwUser] as usr     on  hdr.DestAgentID = usr.agentID
    where usr.[aUser]  like  @uname	and bdy.[Wb_no] like  @Wb_no
)
end
    
    
    
    

GO

    
GO
GRANT EXECUTE ON [dbo].[fn_CountMnfBdyForUserById] TO [pod] AS [dbo]
GO

