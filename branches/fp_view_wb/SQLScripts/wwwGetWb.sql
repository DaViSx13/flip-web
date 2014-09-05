USE [ALERT_F]
GO

IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[wwwGetWb]') AND type in (N'P', N'PC'))
DROP PROCEDURE [dbo].[wwwGetWb]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[wwwGetWb]   -- отображает информацию по накладной
@wb_no [varchar](11)

AS
declare @count int
select @count = COUNT(Wb_No) from Main
WHERE Wb_No = @wb_no
IF @count = 1
BEGIN
SELECT [Wb_No]	--  1
      ,m.D_Acc --   2
      ,[ORG]	--  3
      ,[DEST]    -- 4    
      ,[S_Name] --  5
      ,CASE 
		WHEN len(S_Tel) < 20 THEN char(10) + S_Tel
	   ELSE S_Tel
       END  as S_Tel --  6
      ,CASE 
		WHEN len(S_Co) < 39 THEN char(10) + S_Co
	   ELSE S_Co
       END  as S_Co	--7
      ,CASE 
		WHEN len(S_Adr) < 59 THEN char(10) + S_Adr
       ELSE S_Adr
       END  as S_Adr -- 8
      ,[S_Cnt]	-- 9
      ,[S_Zip]  -- 10
      ,[S_Ref]  -- 11
      ,isnull(KL1.C_City,'Кл-т удален') as S_City	--12 
      ,[R_Name]	-- 13
      ,CASE 
		WHEN len(R_Tel) < 20 THEN char(10) + R_Tel
       ELSE R_Tel
       END  as R_Tel	-- 14
      ,CASE 
		WHEN len(R_Co) < 39 THEN char(10) + R_Co
       ELSE R_Co
       END  as R_Co	-- 15
      ,CASE 
		WHEN len(R_Adr) < 59 THEN char(10) + R_Adr
       ELSE R_Adr
       END  as R_Adr  -- 16
      ,[R_Cnt]  -- 17
      ,[R_Zip]  -- 18
      ,isnull(KL2.C_City,'Кл-т удален') as R_City -- 19
      ,[MetPaym]  -- 20
      ,[Payr]  -- 21      
      ,[T_SRV]  -- 22
      ,[T_PAK]  -- 23
      ,[T_DEL]  -- 24      
      ,CASE Pers
		WHEN 1 THEN 'X'
       ELSE ''
       END as Pers   -- 25
      ,[PCS]	-- 26
      ,[WT]	-- 27
      ,[Vol_WT]  -- 28      
      ,[Timing]  -- 29     
      ,[DOD]  -- 30
      ,[RCPN]  -- 31     
      ,[TDD]  -- 32     
      ,CASE HolidayDel
		WHEN 1 THEN 'X'
       ELSE ''
       END as HolidayDel  -- 33      
      ,INS  -- 34      
      ,@count as wbstatus  -- 35
  FROM [Main] m
  left join Klient Kl1 on SCode=Kl1.CACC 
  left join Klient Kl2 on RCode=Kl2.CACC 
  WHERE Wb_No = @wb_no
 END
 ELSE
	select 0 as wbstatus
GO

GRANT EXECUTE ON [dbo].[wwwGetWb] TO [pod] AS [dbo]
GO

