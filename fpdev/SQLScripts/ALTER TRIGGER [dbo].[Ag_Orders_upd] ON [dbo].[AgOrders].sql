USE [ALERT_F]
GO
/****** Object:  Trigger [dbo].[Ag_Orders_upd]    Script Date: 03/20/2013 19:20:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER TRIGGER [dbo].[Ag_Orders_upd] ON [dbo].[AgOrders] 
FOR  UPDATE 
AS

SET NOCOUNT ON

-- ЖУРНАЛ ВНЕСЕНИЯ ИЗМЕНЕНИЙ В ТАБЛИЦУ
 IF (select count(*) from inserted) =1 
 BEGIN
  declare @id int
  set @id =  ( select ROrdNum from inserted )  

if object_id('tempdb..#AgOrdersTempIns') is not null drop table #AgOrdersTempIns
if object_id('tempdb..#AgOrdersTempDel') is not null drop table #AgOrdersTempDel
SELECT [id]=[ROrdNum],[ORG],[ORGCity],[CACC],[CName],[Address],[ContName],[ContPhone],[ContFax]
      ,[ContMail],[Payr],[PCACC],[PayType],[Type],[Packs],[Wt],[VolWt],[Amt],[CurId]
      ,[CourDate],[CourTimeF],[CourTimeT],[DEST],[DESTCity],[DCACC],[DName],[DAdr],[DContName]
      ,[DContPhone],[DContFax],[DContMail],[Status],[Wb_no],[NeedDel],FrmID, AgentORG, AgentDEST, OrderNo, see into #AgOrdersTempIns from Inserted
SELECT [id]=[ROrdNum],[ORG],[ORGCity],[CACC],[CName],[Address],[ContName],[ContPhone],[ContFax]
      ,[ContMail],[Payr],[PCACC],[PayType],[Type],[Packs],[Wt],[VolWt],[Amt],[CurId]
      ,[CourDate],[CourTimeF],[CourTimeT],[DEST],[DESTCity],[DCACC],[DName],[DAdr],[DContName]
      ,[DContPhone],[DContFax],[DContMail],[Status],[Wb_no],[NeedDel],FrmID, AgentORG, AgentDEST, OrderNo, see into #AgOrdersTempDel from Deleted

declare @Name SysName, @colid smallint, @buf nvarchar(3000)

declare xx cursor local fast_forward for select name, column_id from sys.columns where object_id = ( SELECT object_id FROM sys.objects
             										    WHERE (name = 'AgOrders' )) and (name <> 'ROrdNum' and name <> 'DESTRems' and name <> 'OrgRems' and name <> 'DateIn' and name <> 'DateEd' and name <> 'UserEd' and name <> 'UserIn') 
open xx
fetch next from xx into @Name, @colid 
WHILE @@FETCH_STATUS = 0
BEGIN 
      set @buf = ' declare @old varchar(40), @New varchar(40) ' 
      set @buf = @buf + 
      ' set @Old = ISNULL (convert(varchar, (select ' + @Name + ' from #AgOrdersTempDel where id='+convert(varchar,@id)+')), ''null'' )'
      set @buf = @buf + 
      ' set @New = ISNULL (convert(varchar, (select ' + @Name + ' from #AgOrdersTempIns where id='+convert(varchar,@id)+')), ''null'' )' 
      set @buf = @buf + 
      ' if @old<>@new Insert AgOrdersLog (ROrdNum, act, field,  OldVal, NewVal)values('+convert(varchar,@id)+',2,'''+@Name+''', @Old, @New'
      --+system_user+''','''+convert(varchar,getdate(),103) +''')'
      +' )'
--      select @buf
--
      exec ( @buf )
fetch next from xx into @Name, @colid 
END
close xx
DEALLOCATE xx
      delete #AgOrdersTempIns where [id]= @id
      delete #AgOrdersTempDel where [id]= @id
END
----------------------------


