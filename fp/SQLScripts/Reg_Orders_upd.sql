USE [ALERT_F]
GO
/****** Object:  Trigger [dbo].[Reg_Orders_upd]    Script Date: 06/17/2021 08:12:15 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER TRIGGER [dbo].[Reg_Orders_upd] ON [dbo].[RegOrders] 
FOR  UPDATE 
AS

SET NOCOUNT ON

-- ЖУРНАЛ ВНЕСЕНИЯ ИЗМЕНЕНИЙ В ТАБЛИЦУ
 IF (select count(*) from inserted) =1 
 BEGIN
  declare @id int
  set @id =  ( select ROrdNum from inserted )  
 

if object_id('tempdb..#RegOrdersTempIns') is not null drop table #RegOrdersTempIns
if object_id('tempdb..#RegOrdersTempDel') is not null drop table #RegOrdersTempDel
SELECT [id]=[ROrdNum],[ORG],[ORGCity],[CACC],[CName],[Address],[ContName],[ContPhone],[ContFax]
      ,[ContMail],[Payr],[PCACC],[PayType],[Type],[Packs],[Wt],[VolWt],[Amt],[CurId]
      ,[CourDate],[CourTimeF],[CourTimeT],[DEST],[DESTCity],[DCACC],[DName],[DAdr],[DContName]
      ,[DContPhone],[DContFax],[DContMail],[Status],[Wb_no],[NeedDel], See, orgRems, destRems, agentID, ContentDescr, isweb, orderno, ORGzip, DESTzip
		,sberQuick
		,sberSize
		,sberCost
		,sberProject
		,sberSuit
		,sberType
into #RegOrdersTempIns from Inserted
SELECT [id]=[ROrdNum],[ORG],[ORGCity],[CACC],[CName],[Address],[ContName],[ContPhone],[ContFax]
      ,[ContMail],[Payr],[PCACC],[PayType],[Type],[Packs],[Wt],[VolWt],[Amt],[CurId]
      ,[CourDate],[CourTimeF],[CourTimeT],[DEST],[DESTCity],[DCACC],[DName],[DAdr],[DContName]
      ,[DContPhone],[DContFax],[DContMail],[Status],[Wb_no],[NeedDel], See, orgRems, destRems, agentID, ContentDescr, isweb, orderno, ORGzip, DESTzip 
		,sberQuick
		,sberSize
		,sberCost
		,sberProject
		,sberSuit
		,sberType
into #RegOrdersTempDel from Deleted

declare @Name SysName, @colid smallint, @buf varchar(8000)

declare xx cursor local fast_forward for select name, column_id from sys.columns where object_id = ( SELECT object_id FROM sys.objects
             										    WHERE (name = 'RegOrders' )) and (name <> 'ROrdNum' and name <> 'DateIn' and name <> 'DateEd' and name <> 'UserEd' and name <> 'UserIn' and name <> 'frmId') 
open xx
fetch next from xx into @Name, @colid 
WHILE @@FETCH_STATUS = 0
BEGIN 
      set @buf = ' declare @old varchar(1000), @New varchar(1000) ' 
      set @buf = @buf + 
      ' set @Old = ISNULL (convert(varchar(1000), (select ' + @Name + ' from #RegOrdersTempDel where id='+convert(varchar,@id)+')), '''' )'
      set @buf = @buf + 
      ' set @New = ISNULL (convert(varchar(1000), (select ' + @Name + ' from #RegOrdersTempIns where id='+convert(varchar,@id)+')), '''' )'
      set @buf = @buf + 
      ' if @old<>@new Insert RegOrdersLog (ROrdNum, act, field,  OldVal, NewVal)values('+convert(varchar,@id)+',2,'''+@Name+''', @Old, @New'
      --+system_user+''','''+convert(varchar,getdate(),103) +''')'
      +' )'
--      select @buf
--
      exec ( @buf )
fetch next from xx into @Name, @colid 
END
close xx
DEALLOCATE xx
      delete #RegOrdersTempIns where [id]= @id
      delete #RegOrdersTempDel where [id]= @id
END
----------------------------
