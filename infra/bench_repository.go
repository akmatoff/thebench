package infra

import (
	"sync"

	"github.com/akmatoff/thebench/domain"
)

type BenchRepository struct {
	mu    sync.RWMutex
	bench *domain.Bench
}

func NewBenchRepository() *BenchRepository {
	return &BenchRepository{
		bench: domain.NewBench(),
	}
}

func (r *BenchRepository) Get(id string) (*domain.Bench, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()
	return r.bench, nil
}

func (r *BenchRepository) Save(b *domain.Bench) error {
	r.mu.Lock()
	defer r.mu.Unlock()
	r.bench = b
	return nil
}
