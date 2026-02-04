import pytest
from unittest.mock import MagicMock
from uuid import uuid4
from decimal import Decimal
from src.application.services import InventoryService
from src.domain.entities import Product, Movement
from src.domain.exceptions import ProductNotFoundError, InsufficientStockError

@pytest.fixture
def mock_repo():
    return MagicMock()

@pytest.fixture
def inventory_service(mock_repo):
    return InventoryService(mock_repo)

def test_create_product(inventory_service, mock_repo):
    # Arrange
    mock_repo.save.side_effect = lambda p: p
    
    # Act
    product = inventory_service.create_product(
        name="Test Product",
        description="Test Description",
        sku="TEST-SKU",
        retail_price=Decimal("100.00")
    )
    
    # Assert
    assert product.name == "Test Product"
    assert product.stock == 0
    mock_repo.save.assert_called_once()

def test_receive_stock(inventory_service, mock_repo):
    # Arrange
    product_id = uuid4()
    product = Product(id=product_id, name="Test", stock=10, sku="SKU")
    mock_repo.find_by_id.return_value = product
    mock_repo.save.side_effect = lambda p: p
    
    # Act
    updated_product = inventory_service.receive_stock(product_id, 5, reference="REF-123")
    
    # Assert
    assert updated_product.stock == 15
    mock_repo.save.assert_called_once()
    mock_repo.save_movement.assert_called_once()
    
    movement = mock_repo.save_movement.call_args[0][0]
    assert movement.quantity == 5
    assert movement.type == "INGRESO"

def test_sell_product_success(inventory_service, mock_repo):
    # Arrange
    product_id = uuid4()
    product = Product(id=product_id, name="Test", stock=10, sku="SKU")
    mock_repo.find_by_id.return_value = product
    mock_repo.save.side_effect = lambda p: p
    
    # Act
    updated_product = inventory_service.sell_product(
        product_id, 3, reference="REF-SELL", 
        applicant="John", applicant_area="Sales"
    )
    
    # Assert
    assert updated_product.stock == 7
    mock_repo.save.assert_called_once()
    mock_repo.save_movement.assert_called_once()

def test_sell_product_insufficient_stock(inventory_service, mock_repo):
    # Arrange
    product_id = uuid4()
    product = Product(id=product_id, name="Test", stock=2, sku="SKU")
    mock_repo.find_by_id.return_value = product
    
    # Act & Assert
    with pytest.raises(InsufficientStockError):
        inventory_service.sell_product(product_id, 5)

def test_get_product_not_found(inventory_service, mock_repo):
    # Arrange
    mock_repo.find_by_id.return_value = None
    
    # Act & Assert
    with pytest.raises(ProductNotFoundError):
        inventory_service.get_product(uuid4())
