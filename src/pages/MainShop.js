
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { Container } from "react-bootstrap"
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Navbar, Card } from 'react-bootstrap';
import { Context } from '../index'
import { observer } from 'mobx-react'
import ProductList from '../components/ProductList'
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { fetchFurnitures, fetchProducers, fetchOneType } from '../http/shopBase';
import {PagesMain} from '../components/pages';


const MainShop = observer(() => {
    const { shop } = useContext(Context)
    const [show, setShow] = useState(false);
    const [pageLoad, setPageLoad] = useState(false);
    const [selectedProducers, setSelectedProducers] = useState([]);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [category, setCategory] = useState(null);
    const [searchItem, setSearchItem] = useState('');
    const [update, setUpdate] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducers().then(data => shop.setProducers(data))
        if (shop.category.id == undefined) {
            navigate('/choise-category')
        }
        else {
            fetchOneType(shop.category.id).then(data => {
                setCategory(data)
                console.log()
                const filters = Object.entries(shop.selectedFilters).map(([titleId, valueIds]) => `${titleId}=${Array.from(valueIds).join(',')}`).join('&');
                let producer = '';
                let price = '';
                let quearySearchItem = '';
                if (selectedProducers[0]) {
                    producer = '&producer=' + selectedProducers.map(one => one.id).join(',')
                }
                if (shop.priceMin > 0 && shop.priceMax > 0 && !isDisabled) {
                    price = '&price=' + shop.priceMin + ',' + shop.priceMax
                }
                if (searchItem !== '') {
                    quearySearchItem = '&searchItem=' + searchItem
                }
                console.log(`api/furniture/getAllFurniture?categoryId=${data.id}${producer}${price}${quearySearchItem}
                ${filters ? `&${filters}` : ''}${'&sort=' + shop.sortingOption}&page=${shop.pageMain}&limit=${shop.limitMain}`)
                fetchFurnitures(`api/furniture/getAllFurniture?categoryId=${data.id}${producer}${price}${quearySearchItem}
                ${filters ? `&${filters}` : ''}${'&sort=' + shop.sortingOption}&page=${shop.pageMain}&limit=${shop.limitMain}`).then(data2 => {
                    shop.setFurnitures(data2.rows);
                    shop.setTotalCountMain(data2.count)
                })
            }).catch(e => alert(e.message))
        }

    }, [shop.pagesMain, update])

    useEffect(() => {
        if (category != null) {
            setPageLoad(true)
        }
    },)

    const handleOptionChange = (event) => {
        const { value } = event.target;
        shop.setSortingOption(value)
        setUpdate(prev => prev + 1)
    };

    const handleFilterChange = (titleId, valueId, checked) => {
        let prevFilters = shop.selectedFilters;
        const newFilters = {
            ...prevFilters,
            [titleId]: checked
                ? [...(prevFilters[titleId] ?? []), valueId]
                : prevFilters[titleId]?.filter(id => id !== valueId),
        };
        const res = Object.keys(newFilters).reduce((acc, key) => {
            if (newFilters[key].length > 0) {
                acc[key] = newFilters[key];
            }
            return acc;
        }, {});
        shop.setSelectedFilters(res);
    };

    const isDisabled = shop.priceMin >= shop.priceMax;

    const handleTextChange = (e) => {
        setSearchItem(e.target.value);
    };

    const handleProducerChange = (e) => {
        const producerId = parseInt(e.target.id.split("-")[1]);
        const isChecked = e.target.checked;

        let updatedSelectedProducers;
        if (isChecked) {
            updatedSelectedProducers = [...selectedProducers, { id: producerId }];
        } else {
            updatedSelectedProducers = selectedProducers.filter((p) => p.id !== producerId);
        }
        setSelectedProducers(updatedSelectedProducers);
    };
    
    return (
        <div>{!pageLoad ?
            <div>
                <Spinner animation="border" />
            </div> : <div>
                <>
                    <div className="mb-4 d-flex justify-content-center align-items-center">
                        <Button variant="success" onClick={handleShow} className="me-2">Filter</Button>
                        <div className="d-flex align-items-center">
                            <Form.Control type="search" placeholder="Search" className="me-2" aria-label="Search" value={searchItem} onChange={handleTextChange} />
                            <Button variant="dark" onClick={() => setUpdate(prev => prev + 1)}>Search</Button>
                            <div className="sorting ms-2 d-flex align-items-center">
                                <span style={{ fontSize: '16px', color: '#555' }}>Sorted:</span>
                                <select
                                    value={shop.sortingOption}
                                    onChange={handleOptionChange}

                                    className="ms-2"
                                    style={{
                                        fontSize: '16px',
                                        color: '#555',
                                        padding: '6px 10px',
                                        borderRadius: '4px',
                                        border: '1px solid #ccc',
                                        background: '#fff',
                                        boxShadow: 'none',
                                        appearance: 'none',
                                    }}
                                >
                                    <option value="default">Default</option>
                                    <option value="rait-ASC">Rating ↑</option>
                                    <option value="rait-DESC">Rating ↓</option>
                                    <option value="price-ASC">Price ↑</option>
                                    <option value="price-DESC">Price ↓</option>

                                </select>
                            </div>
                        </div>
                    </div>
                    <Offcanvas show={show} onHide={handleClose}>
                        <Offcanvas.Header closeButton>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Container>
                                <Card>
                                    <Card.Header>Filter Menu</Card.Header>
                                    <Card.Body>
                                        <Form>
                                            <Form.Label>Producer</Form.Label>
                                            {shop.producers.map((producer) => (
                                                <Form.Check
                                                    key={producer.id}
                                                    type="checkbox"
                                                    id={`producer-${producer.id}`}
                                                    name={`producer-${producer.id}`}
                                                    label={producer.name}
                                                    checked={selectedProducers.some((c) => c.id === producer.id)}
                                                    onChange={handleProducerChange}
                                                />
                                            ))}
                                        </Form>
                                        <Row className="align-items-end">
                                            <Col>
                                                <Form.Group controlId="priceFrom">
                                                    <Form.Label>Min price:</Form.Label>
                                                    <Form.Control type="number" value={shop.priceMin} onChange={e => shop.setPriceMin(parseInt(e.target.value))} />
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Form.Group controlId="priceTo">
                                                    <Form.Label>Max price:</Form.Label>
                                                    <Form.Control type="number" value={shop.priceMax} onChange={e => shop.setPriceMax(parseInt(e.target.value))} />
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                            {!isDisabled === true ?<>✔️</>:<>❌</>}
                                                {/* <Button variant="secondary" disabled={isDisabled} >Ok</Button> */}
                                            </Col>
                                        </Row>
                                        {category.parametrs.map(({ title, id: titleId, values }) => (
                                            <Form.Group key={titleId}>
                                                <Form.Label>{title}</Form.Label>
                                                {values.map(({ id: valueId, discription }) => (
                                                    <Form.Check
                                                        key={valueId}
                                                        type="checkbox"
                                                        id={`value-${valueId}`}
                                                        name={`value-${valueId}`}
                                                        label={discription}
                                                        checked={shop.selectedFilters[titleId]?.includes(valueId)}
                                                        onChange={(e) => handleFilterChange(titleId, valueId, e.target.checked)}
                                                    />
                                                ))}
                                            </Form.Group>
                                        ))}
                                        <div className="d-flex justify-content-center">
                                            <Button onClick={() => setUpdate(prev => prev + 1)} variant="secondary">Filter</Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Container>
                        </Offcanvas.Body>
                    </Offcanvas>
                    <ProductList />
                    <PagesMain />
                </>
            </div>
        }</div>
    );
}
)
export default MainShop


