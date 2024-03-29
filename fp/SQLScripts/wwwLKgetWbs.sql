USE [ALERT_F]
GO
/****** Object:  StoredProcedure [dbo].[wwwLKgetWbs]    Script Date: 01/26/2023 10:50:57 ******/
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
	m.wb_no,	-- Номер накладной
	m.OrderNo,	-- Номер заказа
	m.S_Ref,	-- Примечание отправителя
	m.invID,	-- Номер счета
	m.descr,	-- Примечание
	d_acc_txt =	-- Дата накладной в строчном виде
			CONVERT(varchar(20), d_acc,104), 
	d_acc,		-- Дата накладной в формате DATE
	dod_txt =	-- Дата доставки в фомате STRING
			CONVERT(varchar(20), dod,104)
			+ ' '
			+ CONVERT(varchar(5), tdd, 108),  
	dod =	-- Дата доставки в фомате DATE
			CONVERT(datetime, CONVERT(varchar(20), dod,104)
			+ ' '
			+ CONVERT(varchar(5), tdd, 108), 104),
	rcpn,		-- Получатель
	tdd_txt =	-- Время дотавки в фомате STRING
			CONVERT(varchar(5), tdd, 108),
	p_d_in,		-- Дата подтверждения доставки в формате DATE
	p_d_in_txt= -- Дата подтверждения доставки в формате STRING
			CONVERT(varchar(20), p_d_in,104),
	dtd_txt=	-- Расчетная дата доставки в формате STRING
			CONVERT(varchar(20), m.dtd,104),
	m.dtd,		-- Расчетная дата доставки в формате DATE
	m.org,		-- ID фирмы отправителя
	m.dest,		-- ID фирмы получателя
	m.s_co,		-- Фирма отправителя
	m.s_name,	-- ФИО отправителя
	m.s_adr,	-- Адресс отправителя
	m.r_co,		-- Фирма получателя
	m.r_name,	-- ФИО получателя
	m.r_adr,	-- Адресс получателя
	m.wt,		-- Все отправления
	m.vol_wt,	-- Объемный вес отправления
	t_srv,		-- Вид транспорта 
	m.Payr,		-- Платильщик
	m.INSSUM,   -- Сумма сраховки 
	dir =       -- Код получателя/отправителя
		CASE 
			 WHEN m.SCode = @CACC THEN 'in'
			 WHEN m.Rcode = @CACC THEN 'out'
		ELSE
			'other'
		END,
	r_city =	-- Код города получателя
			ISNULL((SELECT c_city FROM Klient WHERE CACC = m.RCode), '-'),
	s_city =	-- Код города отправителя
			ISNULL((SELECT c_city FROM Klient WHERE CACC = m.SCode), '-'),		
	is_ex =		-- Есть ли исключения 
		(SELECT COUNT(1)
		FROM ExLog ex
		WHERE 
			ex.WbNo = m.Wb_No
			and ISNULL(ex.WND, 0) = 0
			and (ex.ExCode <> 61 and ex.ExCode <> 62)),
	m.pcs,
	is_ex_exp =		-- Есть ли исключения 
		CASE 
			 WHEN (select count(1) from ExLog ex where ex.WbNo = m.Wb_No and ISNULL(ex.WND, 0) = 0 and (ex.ExCode <> 61 and ex.ExCode <> 62)) = 0 THEN null
		ELSE
			'Искл: '+cast((select count(1) from ExLog ex where ex.WbNo = m.Wb_No and ISNULL(ex.WND, 0) = 0 and (ex.ExCode <> 61 and ex.ExCode <> 62)) as varchar(3))+' шт.'
		END
FROM Main m WITH(NOLOCK) 	
WHERE
	(m.D_Acc between @bDate and @eDate and @CACC='605258' and @CACC = m.ACC)
	or (m.D_Acc between @bDate and @eDate 
	and @CACC in (m.SCode, m.Rcode, m.ACC) and @CACC<>'605258') 
ORDER BY m.D_Acc DESC