USE [ALERT_F]
GO
/****** Object:  StoredProcedure [dbo].[wwwGetWb]    Script Date: 03/20/2019 15:45:11 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


ALTER PROCEDURE [dbo].[wwwGetWb]   -- отображает информацию по накладной
@wb_no [varchar](50)
AS
declare @count int
IF SUBSTRING(@wb_no, 0, 4) = 'zak' 
begin
select @count = COUNT(ROrdNum) from AgOrders
WHERE ROrdNum = SUBSTRING(@wb_no, 4, len(@wb_no))
IF @count = 1
BEGIN
SELECT @wb_no as Wb_no	--  1
      ,m.DateIn as D_Acc --   2
      ,[ORG]	--  3
      ,[DEST]    -- 4    
      ,m.ContName as S_Name --  5
      ,CASE 
		WHEN len(m.ContPhone) < 20 THEN char(10) + m.ContPhone
	   ELSE m.ContPhone
       END  as S_Tel --  6
      ,CASE 
		WHEN len(m.CName) < 39 THEN char(10) + m.CName
	   ELSE m.CName
       END  as S_Co	--7
      ,CASE 
		WHEN len(m.Address) < 59 THEN char(10) + m.Address
       ELSE m.Address
       END  as S_Adr -- 8
      ,'' as S_Cnt	-- 9
      ,'' as S_Zip  -- 10
      ,m.OrgRems as S_Ref  -- 11
      ,isnull(KL1.C_City,'Кл-т удален') as S_City	--12 
      ,m.DContName as R_Name	-- 13
      ,CASE 
		WHEN len(m.DContPhone) < 20 THEN char(10) + m.DContPhone
       ELSE m.DContPhone
       END  as R_Tel	-- 14
      ,CASE 
		WHEN len(m.DName) < 39 THEN char(10) + m.DName
       ELSE m.DName
       END  as R_Co	-- 15
      ,CASE 
		WHEN len(m.DAdr) < 59 THEN char(10) + m.DAdr
       ELSE m.DAdr
       END  as R_Adr  -- 16
      ,'' as R_Cnt  -- 17
      ,'' as R_Zip  -- 18
      ,isnull(KL2.C_City,'Кл-т удален') as R_City -- 19
      ,m.DESTRems as R_Ref     
      ,CASE m.PayType
		WHEN 1 THEN 'CSH'
       ELSE 'INV'
       END as [MetPaym]  -- 20
      ,[Payr]  -- 21      
      ,'' as [T_SRV]  -- 22
      ,'' as [T_PAK]  -- 23
      ,'' as [T_DEL]  -- 24      
      ,'' as Pers   -- 25
      ,m.Packs as PCS	-- 26
      ,m.Wt as WT	-- 27
      ,m.VolWt as Vol_WT  -- 28      
      ,m.CourTimeF as Timing  -- 29     
      ,m.CourDate as DOD -- 30
      ,'' as RCPN -- 31     
      ,'' as TDD  -- 32     
      ,'' as HolidayDel  -- 33      
      ,0 as INS  -- 34      
      ,@count as wbstatus  -- 35
      ,'' as fp_ref
      ,'' as descr
  FROM AgOrders m
  left join Klient Kl1 on m.CACC=Kl1.CACC 
  left join Klient Kl2 on m.DCACC=Kl2.CACC 
  WHERE m.ROrdNum = SUBSTRING(@wb_no, 4, len(@wb_no))
 END
 ELSE
	select 0 as wbstatus
end 
else begin

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
      ,'' as [R_Ref]     
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
      ,'' as fp_ref
      ,'' as descr
  FROM [Main] m
  left join Klient Kl1 on SCode=Kl1.CACC 
  left join Klient Kl2 on RCode=Kl2.CACC 
  WHERE Wb_No = @wb_no
 END
 ELSE
	select 0 as wbstatus
end
