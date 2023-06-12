import {makeAutoObservable} from "mobx";

export default class ShopStore {

    _test = 0;
    constructor() {
        this._choiseCategory = {}
        this._types = []
        this._producers = []
        this._furnitures = []
        this._choiseType = [];
        this._choiseProducers = [];
        this._choiseFurniture = [];
        this._pageAdminFurniture = 1
        this._totalCountAdminFurniture = 0
        this._limitAdminFurniture = 10

        this._pageMain = 1
        this._totalCountMain = 0
        this._limitMain = 10

        this._oneCategory = {}
        this._sortingOption = 'createdAt-ASC'
        this._selectedFilters = {}
        this._priceMin = 0
        this._priceMax = 0
        makeAutoObservable(this)
    }

    setTypes(types) {
        this._types = types
    }
    setProducers(producers) {
        this._producers = producers
    }
    setFurnitures(furnitures) {
        this._furnitures = furnitures
    }
    setChoiseType(choiseType) {
        this._choiseType = choiseType
    }
    setChoiseProducers(producers) {
        this._choiseProducers = producers
    }
    setChoiseFurniture(furniture) {
        this._choiseFurniture = furniture
    }
    setPageAdminFurniture(page) {
        this._pageAdminFurniture = page
    }
    setTotalCountAdminFurniture(count) {
        this._totalCountAdminFurniture = count
    }
    setLimitAdminFurniture(limit) {
        this._limitAdminFurniture = limit
    }

    setPageMain(page) {
        this._pageMain = page
    }
    setTotalCountMain(count) {
        this._totalCountMain = count
    }
    setLimitMain(limit) {
        this._limitMain = limit
    }

    setCategory(category) {
        this._choiseCategory = category
    }
    setOneCategory(category) {
      
        this._oneCategory = category
    }
    setSortingOption(option)
    {
        this._sortingOption = option
    }
    setSelectedProducers(producers)
    {
        this._selectedProducers = producers
    }
    setSelectedFilters(filters)
    {
        this._selectedFilters = filters
    }
    setPriceMin(price)
    {
        this._priceMin = price
    }
    setPriceMax(price)
    {
        this._priceMax = price
    }
    setSearchItem(searchItem)
    {
        this._searchItem = searchItem
    }


    get types() {
        return this._types
    }
    get producers() {
        return this._producers
    }
    get furnitures() {
        return this._furnitures
    }
    get choiseType() {
        return this._choiseType
    }
    get choiseProducer() {
        return this._choiseProducers
    }
    get choiseFurniture() {
        return this._choiseFurniture
    }
    get pageAdminFurniture() {
        return this._pageAdminFurniture
    }
    get totalCountAdminFurniture() {
        return this._totalCountAdminFurniture
    }
    get limitAdminFurniture() {
        return this._limitAdminFurniture
    }
    get pageMain() {
        return this._pageMain
    }
    get totalCountMain() {
        return this._totalCountMain
    }
    get limitMain() {
        return this._limitMain
    }
    get category() {
        return this._choiseCategory
    }
    get oneCategory() {
        return this._oneCategory
    }

    get sortingOption() {
        return this._sortingOption 
    }
    get selectedProducers(){
        return this._selectedProducers
    }
    get selectedFilters(){
        return this._selectedFilters
    }
    // get category(){
    //     return this._category
    // }
    get priceMin(){
        return this._priceMin
    }
    get priceMax(){
        return  this._priceMax
    }
    get searchItem(){
        return this._searchItem
    }
}