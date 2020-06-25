use ALERT_F
exec sp_rename 'RegOrders.ORGAdressIndex', 'ORGzip', 'COLUMN';
exec sp_rename 'RegOrders.DESTAdressIndex', 'DESTzip', 'COLUMN';v