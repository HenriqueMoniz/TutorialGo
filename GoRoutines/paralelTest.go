package main

import (
	"fmt"
	"sync"
)

// SafeMap é utilizado para ser possivel aceder e alterar dados sem risco de "corrupção"
type SafeMap struct {
	v   map[string]bool
	mux sync.Mutex
}

// SetVal define o valor, dada uma certa chave, os locks são utilizados para apenas 1 rotina aceder de cada vez
func (m *SafeMap) SetVal(key string, val bool) {
	m.mux.Lock()
	m.v[key] = val
	m.mux.Unlock()
}

// GetVal retorna o valor dado uma certa chave, os locks são utilizados para apenas 1 rotina aceder de cada vez
func (m *SafeMap) GetVal(key string) bool {
	m.mux.Lock()

	defer m.mux.Unlock()

	return m.v[key]
}

type Fetcher interface {
	// Fetch returns the body of URL and
	// a slice of URLs found on that page.
	Fetch(url string) (body string, urls []string, err error)
}

// Crawl uses fetcher to recursively crawl
// pages starting with url, to a maximum of depth.
func Crawl(url string, depth int, fetcher Fetcher, status chan bool, urlMap SafeMap) {

	// Verifica se o url já foi pesquisado
	if ok := urlMap.GetVal(url); ok {
		//fmt.Println("Already fetched url!")
		status <- true
		return
	}

	// Marcar o url como pesquisado
	urlMap.SetVal(url, true)

	if depth <= 0 {
		status <- false
		return
	}

	body, urls, err := fetcher.Fetch(url)
	if err != nil {
		fmt.Println(err)
		status <- false
		return
	}

	fmt.Printf("found: %s %q\n", url, body)

	statuses := make([]chan bool, len(urls))
	for index, u := range urls {
		statuses[index] = make(chan bool)
		go Crawl(u, depth-1, fetcher, statuses[index], urlMap)
	}

	// Wait for child goroutines.
	for _, childstatus := range statuses {
		<-childstatus
	}

	// And now this goroutine can finish.
	status <- true

	return
}

func main() {
	urlMap := SafeMap{v: make(map[string]bool)}
	status := make(chan bool)
	go Crawl("https://golang.org/", 10, fetcher, status, urlMap)
	<-status
}

type fakeFetcher map[string]*fakeResult

type fakeResult struct {
	body string
	urls []string
}

func (f fakeFetcher) Fetch(url string) (string, []string, error) {
	if res, ok := f[url]; ok {
		return res.body, res.urls, nil
	}
	return "", nil, fmt.Errorf("not found: %s", url)
}

// fetcher is a populated fakeFetcher.
var fetcher = fakeFetcher{
	"https://golang.org/": &fakeResult{
		"The Go Programming Language",
		[]string{
			"https://golang.org/pkg/",
			"https://golang.org/cmd/",
		},
	},
	"https://golang.org/pkg/": &fakeResult{
		"Packages",
		[]string{
			"https://golang.org/",
			"https://golang.org/cmd/",
			"https://golang.org/pkg/fmt/",
			"https://golang.org/pkg/os/",
		},
	},
	"https://golang.org/pkg/fmt/": &fakeResult{
		"Package fmt",
		[]string{
			"https://golang.org/",
			"https://golang.org/pkg/",
		},
	},
	"https://golang.org/pkg/os/": &fakeResult{
		"Package os",
		[]string{
			"https://golang.org/",
			"https://golang.org/pkg/",
		},
	},
}
