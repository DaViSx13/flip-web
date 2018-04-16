USE [ALERT_F]
GO

/****** Object:  StoredProcedure [dbo].[wwwGetWebWb]    Script Date: 28.03.2018 19:28:12 ******/
DROP PROCEDURE [dbo].[wwwGetWebWb]
GO

/****** Object:  StoredProcedure [dbo].[wwwGetWebWb]    Script Date: 28.03.2018 19:28:12 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[wwwGetWebWb]   -- отображает информацию по накладной
@wb_no [varchar](50)

AS
declare @count int
select @count = COUNT(Wb_No) from wwwClientWB
WHERE Wb_No = @wb_no
IF @count = 1
BEGIN
SELECT [Wb_No]	--  1
      ,Date_IN as D_Acc
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
      ,'' as S_Cnt	-- 9
      ,'' as [S_Zip]  -- 10
      ,[S_Ref]  -- 11
      , (select city + ', ' + country + case when [state] is null then '' else ', ' + [state] end from  VCity where VCity.cityId=m.S_City_ID) as S_City 	--12 
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
      ,'' as R_Cnt -- 17
      ,'' as R_Zip  -- 18
      ,(select city + ', ' + country + case when [state] is null then '' else ', ' + [state] end from  VCity where VCity.cityId=m.R_City_ID) as R_City -- 19
      ,[R_Ref]
      ,'' as MetPaym  -- 20
      ,'' as Payr  -- 21      
      ,'' as [T_SRV]  -- 22
      , CASE T_PAC
		WHEN 1 THEN 'LE'
		WHEN 0 THEN 'PL'
       ELSE 'PA'
       END as T_PAK  -- 23
      ,'' as T_DEL  -- 24      
      ,'' as Pers   -- 25
      ,PCS	-- 26
      ,WT	-- 27
      ,Vol_WT  -- 28      
      ,'' as Timing -- 29     
      ,'' as DOD  -- 30
      ,'' as [RCPN]  -- 31     
      ,'' as [TDD]  -- 32     
      ,'' as HolidayDel  -- 33      
      ,'' as INS  -- 34      
      ,@count as wbstatus  -- 35
      ,'Номер заказа: ' + convert(varchar(50),m.Ord_No) as fp_ref
  FROM wwwClientWB m
  --left join Klient Kl1 on SCode=Kl1.CACC 
  --left join Klient Kl2 on RCode=Kl2.CACC 
  WHERE Wb_No = @wb_no
 END
 ELSE
	select 0 as wbstatus

GO
GRANT EXECUTE ON [dbo].[wwwGetWebWb] TO [pod] AS [dbo]
GO
