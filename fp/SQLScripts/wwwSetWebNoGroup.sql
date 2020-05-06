USE [ALERT_F]
GO

/****** Object:  StoredProcedure [dbo].[wwwSetWebNoGroup]    Script Date: 05/06/2020 23:02:40 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		vd.zinovev
-- Create date: 01.05.2020
-- Description:	���������� ��������� � �������
--				wwwWenNoGroup.
-- =============================================
CREATE PROCEDURE [dbo].[wwwSetWebNoGroup](@orderNum int,
								  @webNum   varchar(50),
								  @cost		float,
								  @isAgent	int)

AS
BEGIN

	-- �������� ������� ������������ ���������
	DECLARE @count INT;
	DECLARE @msg varchar(MAX);
	DECLARE @foundingRow TABLE(id INT,
							   isDeleted INT);
	insert into @foundingRow
						  SELECT id, isDeleted
						  FROM wwwWebNoGroup
						  WHERE wwwWebNoGroup.web_num = @webNum;
						  
	SET @count = (SELECT COUNT(id)
	              FROM @foundingRow) 					  
	IF(@count > 0)
	BEGIN
		DECLARE @isDel int;
		SET @isDel = (SELECT TOP(1) isDeleted
		              FROM @foundingRow)               
		IF(@isDel > 0)
		BEGIN
			SET @msg = '���������� ��������� ������ � ������� '
					   + @webNum
					   + '���������� ������������ ������ ��� ������� ������ �����';
			RAISERROR(@msg, 1, 36);
			RETURN;
		END
		ELSE
		BEGIN
			SET @msg = '���������� ����������� ������ � ������� '
				       + @webNum;
			RAISERROR(@msg, 1, 48);
			RETURN;
		END
	END
	-- ����� ��������
	
	-- �������� ������� ������ � �������
	SET @count = (SELECT COUNT(1)
			      FROM AgOrders);
	IF (@count = 0)
	BEGIN
		SET @msg = '����� � ������� "'
					+ @orderNum
					+ '" �� ������ � ���� ������. '
					+ '���������� ��������� ����� ������'
		RAISERROR(@msg, 1,62);
		RETURN;
	END		      
	-- ����� ��������
	
	-- ������� ��������
	INSERT INTO wwwWebNoGroup
								(order_num,
								web_num,
								isAgent,
								isDeleted,
								cost)
	VALUES
								(@orderNum,
								@webNum,
								@isAgent,
								0,
								@cost);			  
	-- ����� �������
END

GO

GRANT EXECUTE ON [dbo].[wwwSetWebNoGroup] TO [pod] AS [dbo]
GO
