USE [ALERT_F]
GO
/****** Object:  StoredProcedure [dbo].[wwwClientGetWbs]    Script Date: 02/01/2023 15:42:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER Procedure [dbo].[wwwClientGetWbs]
	@period varchar(10)= null,
	@from varchar(8) = null,
	@to varchar(8) = null,
	@clientID int,
	@dir varchar(3) = 'all'
AS

--if ISNULL(ltrim(rtrim(@period)), '') = '' or @agentID is null return

if @clientID is null return
if ISNULL(ltrim(rtrim(@period)), '') = '' set @period = left(CONVERT(varchar(50), GETDATE(), 112), 6) + '01'

declare @bDate date, @eDate date, @CACC varchar(50)

select @CACC = CACC from wwwClientUser where userID = @clientID -- 54

BEGIN
	IF @from IS NULL
		set @bDate = @period --'20100201'
	ELSE
		SET @bDate = CONVERT(DATE, @from, 112)
END

BEGIN
	IF @to IS NULL
		set @eDate = dateadd(d, -1, DATEADD(m,1,@bDate))
	ELSE
		SET @eDate = CONVERT(DATE, @to, 112)
END


select distinct
  m.wb_no					-- Номер накладной
, m.OrderNo					-- Номер заказа 
, d_acc_txt=				-- Принято
	CONVERT(varchar(20), d_acc,104)
, d_acc						-- Принято (Формат DateTime)
, dod_txt=					-- Доставлено
	CONVERT(varchar(20), dod,104) + ' ' + CONVERT(varchar(5), tdd, 108)
, dod=						-- Доставлено (Формат DateTime)
	CONVERT(datetime, CONVERT(varchar(20), dod,104) + ' ' + CONVERT(varchar(5), tdd, 108), 104)
, rcpn						-- Получил
, p_d_in					-- Потвердил (Формат DateTime)
, p_d_in_txt=				-- Потвердил
	CONVERT(varchar(20), p_d_in,104)--, p_d_in
, dtd_txt=					-- РДД
	CONVERT(varchar(20), m.dtd,104), m.dtd
, m.org						-- ORG
, m.s_co					-- Компания отправитель
, m.S_Name as s_name		-- ФИО отправителя
, m.S_Adr as s_adr			-- Адрес отправителя
, s_city=					-- Город отправителя
	ISNULL((SELECT c_city FROM Klient WHERE CACC = m.SCode), '-')
, m.dest					-- DEST
, m.r_co					-- Компания получатель
, m.R_Name as r_name		-- ФИО получателя
, m.R_Adr as r_adr			-- Адрес получателя
, r_city =					-- Город получателя
	ISNULL((SELECT c_city FROM Klient WHERE CACC = m.RCode), '-')
, m.wt						-- Вес
, m.vol_wt					-- Объемный вес
, t_srv
, m.PCS as pcs				-- Мест
, m.INSSUM					-- Страховка
, m.invID					-- Номер счета
, m.Descr as descr			-- Примечание
, m.S_Ref					-- Примечание отправителя

, is_ex =					-- Количество исключений
	(select COUNT(1) from ExLog ex where ex.WbNo = m.Wb_No and ISNULL(ex.WND, 0) = 0 and (ex.ExCode <> 61 and ex.ExCode <> 62))
, is_ex_exp =				-- Есть ли исключения 
		CASE 
			 WHEN (select count(1) from ExLog ex where ex.WbNo = m.Wb_No and ISNULL(ex.WND, 0) = 0 and (ex.ExCode <> 61 and ex.ExCode <> 62)) = 0 THEN null
		ELSE
			'Исключений: ' +
			 cast((select count(1) from ExLog ex where ex.WbNo = m.Wb_No and ISNULL(ex.WND, 0) = 0 and (ex.ExCode <> 61 and ex.ExCode <> 62)) AS VARCHAR(4))
			  + ' шт.'
		END
from Main m with(nolock) 
	
where m.D_Acc between @bDate and @eDate 
	and @CACC in (m.SCode, m.Rcode, m.ACC)	
order by m.D_Acc desc

