CREATE PROCEDURE [dbo].[wwwGetEmptyWb]
    @Order int,
    @type varchar(15) = 'agent'
AS
    IF @type = 'agent'
        BEGIN
            SELECT
                Wb_no = 'AZ' + LTRIM(STR(@Order)),      -- 1. ����� ���������

                agOrders.DateIn     AS D_Acc,           -- 2. ���� �������� � �������
                agOrders.ORG,                           -- 3. ����� �����������
                agOrders.DEST,                          -- 4. ����� ����������
                agOrders.ContName   AS S_Name,          -- 5. ��� �������� �����������
                agOrders.ContPhone  AS S_Tel,           -- 6. ������� �����������
                agOrders.CName      AS S_Co,            -- 7. �������� �����������
                agOrders.Address    AS S_Adr,           -- 8. ����� �����������
                S_Cnt = scity.country,                  -- 9. ������ �����������
                S_Zip = '''',                           -- 10. ������ �����������
                agOrders.OrgRems    AS S_Ref,           -- 11. ���������� �����������
                S_City = scity.city,                    -- 12. ����� �����������

                agOrders.DContName  AS R_Name,          -- 13. ��� �������� ����������
                agOrders.DContPhone AS R_Tel,           -- 14. ������� ����������
                agOrders.DName      AS R_Co,            -- 15. �������� ����������
                agOrders.DAdr       AS R_Adr,           -- 16. ����� ����������
                R_Cnt = rcity.country,                  -- 17. ������ ����������
                R_Zip = '''',                           -- 18. ������ ����������
                R_City = rcity.city,                    -- 19. ����� ����������
                agOrders.DESTRems   AS R_Ref,           -- 20. ���������� ����������

                payr = cast(2 as smallint),             -- 21. ����������
                T_SRV = '',                             -- 22. ���������
                CASE agOrders.Type
                    WHEN 1 THEN 'LE'
                    WHEN 0 THEN 'PL'
                    ELSE 'PA'
                END                 AS T_PAK,           -- 24. ��������
                '' AS T_DEL,                            -- 24. ��� ��������
                '' AS Pers,                             -- 25. ����� � ����
                agOrders.Packs      AS PCS,             -- 26. ���������� ����
                agOrders.Wt         AS WT,              -- 27. ���
                agOrders.VolWt      AS Vol_WT,          -- 28. �������� ���
                agOrders.CourTimeF  AS Timing,          -- 29. ����� ������� �������
                agOrders.CourDate   AS DOD,             -- 30. ���� �������� �������
                RCPN = '',                              -- 31. ����������
                TDD = '',                               -- 32. ����� ��������
                HolidayDel = '',                        -- 33. �������� � ��������
                INS = 0,                                -- 34. ��������� ����
                wbstatus = 1,                           -- 35. ������
                fp_ref = '',                            -- 36. ����������
                agOrders.DESTRems,                      -- 37. ���������� � ���������,
                '2'                 AS acc              -- 38. ���
            FROM AgOrders agOrders
                     LEFT JOIN vCity scity ON agOrders.ORGCity = scity.cityId
                     LEFT JOIN vCity rcity ON agOrders.DESTCity = rcity.cityId
            WHERE agOrders.ROrdNum = @Order
        END
    ELSE
        BEGIN
            SELECT
                Wb_no = 'KZ' + LTRIM(STR(@Order)),       -- 1. ����� ���������

                        regOrders.DateIn,                        -- 2. ���� �������� � �������
                        regOrders.ORG,                           -- 3. ����� �����������
                        regOrders.DEST,                          -- 4. ����� ����������
                        regOrders.ContName   AS S_Name,          -- 5. ��� �������� �����������
                        regOrders.ContPhone  AS S_Tel,           -- 6. ������� �����������
                        regOrders.CName      AS S_Co,            -- 7. �������� �����������
                        regOrders.Address    AS S_Adr,           -- 8. ����� �����������
                S_Cnt = scity.country,                   -- 9. ������ �����������
                S_Zip = '''',                            -- 10. ������ �����������
                        regOrders.OrgRems    AS S_Ref,           -- 11. ���������� �����������
                S_City = scity.city,                     -- 12. ����� �����������

                regOrders.DContName  AS R_Name,          -- 13. ��� �������� ����������
                regOrders.DContPhone AS R_Tel,           -- 14. ������� ����������
                regOrders.DName      AS R_Co,            -- 15. �������� ����������
                regOrders.DAdr       AS R_Adr,           -- 16. ����� ����������
                R_Cnt = rcity.country,                   -- 17. ������ ����������
                R_Zip = '''',                            -- 18. ������ ����������
                R_City = rcity.city,                     -- 19. ����� ����������
                regOrders.DESTRems   AS R_Ref,           -- 20. ���������� ����������

                payr = cast(2 as smallint),              -- 21. ����������
                T_SRV = '',                              -- 22. ���������
                CASE regOrders.Type
                    WHEN 1 THEN 'LE'
                    WHEN 0 THEN 'PL'
                    ELSE 'PA'
                            END                 AS T_PAK,            -- 24. ��������
                '' AS T_DEL,                             -- 24. ��� ��������
                '' AS Pers,                              -- 25. ����� � ����
                regOrders.Packs      AS PCS,             -- 26. ���������� ����
                regOrders.Wt         AS WT,              -- 27. ���
                regOrders.VolWt      AS Vol_WT,          -- 28. �������� ���
                regOrders.CourTimeF  AS Timing,          -- 29. ����� ������� �������
                regOrders.CourDate   AS DOD,             -- 30. ���� �������� �������
                RCPN = '',                               -- 31. ����������
                TDD = '',                                -- 32. ����� ��������
                HolidayDel = '',                         -- 33. �������� � ��������
                INS = 0,                                 -- 34. ��������� ����
                wbstatus = 1,                            -- 35. ������
                fp_ref = '',                             -- 36. ����������
                regOrders.DESTRems,                      -- 37. ���������� � ���������,
                '2'                 AS acc               -- 38. ���
            FROM RegOrders regOrders
                     LEFT JOIN vCity scity ON regOrders.ORGCity = scity.cityId
                     LEFT JOIN vCity rcity ON regOrders.DESTCity = rcity.cityId
            WHERE regOrders.ROrdNum = @Order
        END

GO

GRANT EXECUTE ON wwwGetEmptyWb to pod
GO