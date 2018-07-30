class SearchTerm {
    state = {
        search: ''
    }

    setSearchTerm(term) {
        this.state.search = term
    }

    getSearchTerm() {
        return this.state.search
    }

}


const instance = new SearchTerm()
Object.freeze(instance)

export default instance
