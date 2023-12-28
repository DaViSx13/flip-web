CREATE PROCEDURE [dbo].[wwwGetEmptyWb]
    @Order int,
    @type varchar(15) = 'agent'
AS
    IF @type = 'agent'
        BEGIN
            SELECT
                Wb_no = 'AZ' + LTRIM(STR(@Order)),      -- 1. Номер накладной

                agOrders.DateIn     AS D_Acc,           -- 2. Дата внесения в систему
                agOrders.ORG,                           -- 3. Город отправителя
                agOrders.DEST,                          -- 4. Город получателя
                agOrders.ContName   AS S_Name,          -- 5. Имя контакта отправителя
                agOrders.ContPhone  AS S_Tel,           -- 6. Телефон отправителя
                agOrders.CName      AS S_Co,            -- 7. Компания отправитель
                agOrders.Address    AS S_Adr,           -- 8. Адрес отправителя
                S_Cnt = scity.country,                  -- 9. Страна отправителя
                S_Zip = '''',                           -- 10. Индекс отправителя
                agOrders.OrgRems    AS S_Ref,           -- 11. Примечания отправителя
                S_City = scity.city,                    -- 12. Город отправителя

                agOrders.DContName  AS R_Name,          -- 13. Имя контакта получателя
                agOrders.DContPhone AS R_Tel,           -- 14. Телефон получателя
                agOrders.DName      AS R_Co,            -- 15. Компания получателя
                agOrders.DAdr       AS R_Adr,           -- 16. Адрес получателя
                R_Cnt = rcity.country,                  -- 17. Страна получателя
                R_Zip = '''',                           -- 18. Индекс получателя
                R_City = rcity.city,                    -- 19. Город получателя
                agOrders.DESTRems   AS R_Ref,           -- 20. Примечания получателя

                payr = cast(2 as smallint),             -- 21. Платильщик
                T_SRV = '',                             -- 22. Транспорт
                CASE agOrders.Type
                    WHEN 1 THEN 'LE'
                    WHEN 0 THEN 'PL'
                    ELSE 'PA'
                END                 AS T_PAK,           -- 24. Упаковка
                '' AS T_DEL,                            -- 24. Тип доставки
                '' AS Pers,                             -- 25. Лично в руки
                agOrders.Packs      AS PCS,             -- 26. Количество мест
                agOrders.Wt         AS WT,              -- 27. Вес
                agOrders.VolWt      AS Vol_WT,          -- 28. Объемный вес
                agOrders.CourTimeF  AS Timing,          -- 29. Время приезда курьера
                agOrders.CourDate   AS DOD,             -- 30. Дата прибытия курьера
                RCPN = '',                              -- 31. Получатель
                TDD = '',                               -- 32. Время доставки
                HolidayDel = '',                        -- 33. Доставка в выходной
                INS = 0,                                -- 34. Страховой сбор
                wbstatus = 1,                           -- 35. Статус
                fp_ref = '',                            -- 36. Примечания
                agOrders.DESTRems,                      -- 37. Примечания к получению,
                '2'                 AS acc              -- 38. АСС
            FROM AgOrders agOrders
                     LEFT JOIN vCity scity ON agOrders.ORGCity = scity.cityId
                     LEFT JOIN vCity rcity ON agOrders.DESTCity = rcity.cityId
            WHERE agOrders.ROrdNum = @Order
        END
    ELSE
        BEGIN
            SELECT
                Wb_no = 'KZ' + LTRIM(STR(@Order)),       -- 1. Номер накладной

                        regOrders.DateIn,                        -- 2. Дата внесения в систему
                        regOrders.ORG,                           -- 3. Город отправителя
                        regOrders.DEST,                          -- 4. Город получателя
                        regOrders.ContName   AS S_Name,          -- 5. Имя контакта отправителя
                        regOrders.ContPhone  AS S_Tel,           -- 6. Телефон отправителя
                        regOrders.CName      AS S_Co,            -- 7. Компания отправитель
                        regOrders.Address    AS S_Adr,           -- 8. Адрес отправителя
                S_Cnt = scity.country,                   -- 9. Страна отправителя
                S_Zip = '''',                            -- 10. Индекс отправителя
                        regOrders.OrgRems    AS S_Ref,           -- 11. Примечания отправителя
                S_City = scity.city,                     -- 12. Город отправителя

                regOrders.DContName  AS R_Name,          -- 13. Имя контакта получателя
                regOrders.DContPhone AS R_Tel,           -- 14. Телефон получателя
                regOrders.DName      AS R_Co,            -- 15. Компания получателя
                regOrders.DAdr       AS R_Adr,           -- 16. Адрес получателя
                R_Cnt = rcity.country,                   -- 17. Страна получателя
                R_Zip = '''',                            -- 18. Индекс получателя
                R_City = rcity.city,                     -- 19. Город получателя
                regOrders.DESTRems   AS R_Ref,           -- 20. Примечания получателя

                payr = cast(2 as smallint),              -- 21. Платильщик
                T_SRV = '',                              -- 22. Транспорт
                CASE regOrders.Type
                    WHEN 1 THEN 'LE'
                    WHEN 0 THEN 'PL'
                    ELSE 'PA'
                            END                 AS T_PAK,            -- 24. Упаковка
                '' AS T_DEL,                             -- 24. Тип доставки
                '' AS Pers,                              -- 25. Лично в руки
                regOrders.Packs      AS PCS,             -- 26. Количество мест
                regOrders.Wt         AS WT,              -- 27. Вес
                regOrders.VolWt      AS Vol_WT,          -- 28. Объемный вес
                regOrders.CourTimeF  AS Timing,          -- 29. Время приезда курьера
                regOrders.CourDate   AS DOD,             -- 30. Дата прибытия курьера
                RCPN = '',                               -- 31. Получатель
                TDD = '',                                -- 32. Время доставки
                HolidayDel = '',                         -- 33. Доставка в выходной
                INS = 0,                                 -- 34. Страховой сбор
                wbstatus = 1,                            -- 35. Статус
                fp_ref = '',                             -- 36. Примечания
                regOrders.DESTRems,                      -- 37. Примечания к получению,
                '2'                 AS acc               -- 38. АСС
            FROM RegOrders regOrders
                     LEFT JOIN vCity scity ON regOrders.ORGCity = scity.cityId
                     LEFT JOIN vCity rcity ON regOrders.DESTCity = rcity.cityId
            WHERE regOrders.ROrdNum = @Order
        END

GO

GRANT EXECUTE ON wwwGetEmptyWb to pod
GO