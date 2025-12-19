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
