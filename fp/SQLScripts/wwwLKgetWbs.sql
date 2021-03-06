USE [ALERT_F]
GO
/****** Object:  StoredProcedure [dbo].[wwwLKgetWbs]    Script Date: 05/23/2021 12:45:15 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



ALTER Procedure [dbo].[wwwLKgetWbs]
	@period varchar(10)= null,
	@from varchar(8) = null,
	@to varchar(8) = null,
	@clientID varchar(10),
	@dir varchar(3) = 'all'
AS

DECLARE @bDate date
DECLARE @eDate date
DECLARE @CACC varchar(10)

IF @clientID is null RETURN
IF ISNULL(ltrim(rtrim(@period)), '') = ''
	SET @period = left(CONVERT(varchar(50), GETDATE(), 112), 6) + '01'

SELECT @CACC = @clientID

BEGIN
	IF @from IS NULL
		SET @bDate = @period
	ELSE
		SET @bDate = CONVERT(date, @from, 112);
END

BEGIN
	IF @to IS NULL
		SET @eDate = dateadd(d, -1, DATEADD(m,1,@bDate))
	ELSE
		SET @eDate = DATEADD(DAY, 1, CONVERT(date,@to, 112));
END

SELECT DISTINCT
	m.wb_no,
	d_acc_txt=CONVERT(varchar(20), d_acc,104),
	d_acc,
	dod_txt=CONVERT(varchar(20), dod,104) + ' ' + CONVERT(varchar(5), tdd, 108),
	dod = CONVERT(datetime, CONVERT(varchar(20), dod,104) + ' ' + CONVERT(varchar(5), tdd, 108), 104),
	rcpn,
	tdd_txt = CONVERT(varchar(5), tdd, 108),
	p_d_in,
	p_d_in_txt=CONVERT(varchar(20), p_d_in,104),
	dtd_txt=CONVERT(varchar(20), m.dtd,104),
	m.dtd,
	m.org,
	m.dest,
	m.s_co,
	m.r_co,
	m.wt,
	m.vol_wt,
	t_srv,
	m.Payr,
	dir =
		CASE 
			 WHEN m.SCode = @CACC or m.Payr = 1 THEN 'in'
			 WHEN m.Rcode = @CACC THEN 'other'
		ELSE
			'other'
		END,
	r_city = ISNULL((SELECT c_city FROM Klient WHERE CACC = m.RCode), '-'),
	s_city = ISNULL((SELECT c_city FROM Klient WHERE CACC = m.SCode), '-'),
	is_ex = 
		(SELECT COUNT(1)
		FROM ExLog ex
		WHERE 
			ex.WbNo = m.Wb_No
			and ISNULL(ex.WND, 0) = 0
			and (ex.ExCode <> 61 and ex.ExCode <> 62)),
			m.pcs
FROM Main m WITH(NOLOCK) 	
WHERE
	(m.D_Acc between @bDate and @eDate and @CACC='605258' and @CACC = m.ACC)
	or (m.D_Acc between @bDate and @eDate 
	and @CACC in (m.SCode, m.Rcode, m.ACC) and @CACC<>'605258') 
ORDER BY m.D_Acc DESC




