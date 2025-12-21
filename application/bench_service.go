package application

import (
	"github.com/akmatoff/thebench/domain"
	"github.com/akmatoff/thebench/infra"
)

type BenchService struct {
	benchRepo      *infra.BenchRepository
	eventPublisher domain.EventPublisher
}

func NewBenchService(benchRepo *infra.BenchRepository, eventPublisher domain.EventPublisher) *BenchService {
	return &BenchService{
		benchRepo:      benchRepo,
		eventPublisher: eventPublisher,
	}
}

func (b *BenchService) GetBench(id string) (*domain.Bench, error) {
	return b.benchRepo.Get(id)
}

func (b *BenchService) Sit(p *domain.Participant) error {
	bench, _ := b.benchRepo.Get("the-bench")

	return bench.Sit(p)
}
