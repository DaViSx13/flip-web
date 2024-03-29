USE [ALERT_F]
GO
/****** Object:  StoredProcedure [dbo].[wwwClientGetWebWbs]    Script Date: 02/01/2023 17:12:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


ALTER procedure [dbo].[wwwClientGetWebWbs]
@period varchar(10) = null,
@from varchar(8) = null,
@to varchar(8) = null,
@clientID int
AS



if @clientID is null return
if ISNULL(ltrim(rtrim(@period)), '') = '' set @period = left(CONVERT(varchar(50), GETDATE(), 112), 6) + '01'

declare @bDate date, @eDate date, @agID int
declare @aUser varchar(50)

select  @aUser = aUser from wwwClientUser where userID = @clientID

BEGIN
	IF @from IS NULL
		set @bDate = @period+'01'
	ELSE
		set @bDate = CONVERT(DATE, @from, 112)
END

BEGIN
	IF @to IS NULL
		set @eDate = DATEADD(m,1,@bDate)
	ELSE
		SET @eDate = DATEADD(DAY, 1, CONVERT(DATE, @to, 112))	
END



SELECT 
		[id]			-- ID
      ,c.[Wb_no]		-- Номер накладной
      ,[ord_no]			-- Номер заказа
      ,s_city_id		-- ID города отправителя
      ,[s_city] as org	-- Город отправителя
      ,[s_name]			-- ФИО отправителя
      ,[s_tel]			-- Телефон отправителя
      ,[s_co]			-- Компания отправителя
      ,[s_adr]			-- Адрес отправителя
      ,[s_ref]			-- Примечание отправителя
      ,[s_mail]			-- EMAIL отправителя
      ,r_city_id		-- ID города получателя
      ,[r_city] as dest	-- Город получателя
      ,[r_name]			-- ФИО получателя
      ,[r_tel]			-- Телефон получателя
      ,[r_co]			-- Компания получателя
      ,[r_adr]			-- Адрес получателя
      ,[r_ref]			-- Примечания получателя
      ,[r_mail]			-- EMAIL получателя
      ,[user_in]		-- Пользователя внесший информацию
      ,[date_in]		-- Дата
      ,c.[Wt]			-- Вес
      ,[vol_wt]			-- Объемный вес
      ,[pcs]			-- Мест
      ,[inssum]			-- Сумма страховки
	  ,r.Payr			-- Платильщик
	  ,payr_text= case 	-- Платильщик текстом
		when r.[PayType] = 1 then 'Отправитель'
		when r.[PayType] = 2 then 'Получатель'
		else '3 лицо'
		end  
	  ,c.Descr			-- Описание
      ,metpaym = case	-- Вид оплаты
      when r.[PayType] = 1 then 'INV'
      else 'CSH'
      end       
      ,metpaym_text = case	-- Вид оплаты текстом
      when r.[PayType] = 0 then 'По счету'
      else 'Наличными'
      end
      ,[t_pac] as type  
  FROM wwwClientWB c
  left join AgOrders r
  on r.ROrdNum = c.Ord_No
  where c.[Date_IN] >= @bDate and c.[Date_IN] < @eDate
  and (@agID = -1 or (c.[User_IN]=@aUser))
  and wbsource = 'webClient'
  order by id desc



