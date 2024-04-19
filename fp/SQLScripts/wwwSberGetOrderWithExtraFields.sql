use ALERT_F

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- Процедура получения заказа и дополнительных полей от Сбертранспорт
-- @order - Номер внутреннего заказа
create procedure wwwSberGetOrderWithExtraFields
    @order int
AS
    SELECT
        fl.*,
        RO.*

    FROM
        wwwSberExtraFields fl
    JOIN dbo.RegOrders RO
        ON RO.ROrdNum = fl.ROrdNum
    WHERE
        fl.ROrdNum = @order
GO

    GRANT EXECUTE ON wwwSberGetOrderWithExtraFields TO pod
