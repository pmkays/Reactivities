using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistance;

namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest
        {
            public Guid Id {get; set;}
            public string Title {get; set;}
            public string Description {get; set;}
            public string Category {get; set;}
            public DateTime Date {get; set;}
            public string City {get; set;}
            public string Venue {get; set;}
        }

        //IRequestHandler only takes in one param since we are returning unit not object
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                this._context = context;
            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = new Activity
                {
                    Id = request.Id,
                    Title = request.Title,
                    Description = request.Description,
                    Category = request.Category,
                    Date = request.Date,
                    City = request.City,
                    Venue = request.Venue

                };

                _context.Activities.Add(activity);

                //doing > 0 converts int to bool
                var success = await _context.SaveChangesAsync() > 0;

                if(success)
                {
                    return Unit.Value;
                }
                else
                {
                    throw new Exception("This activity could not be added");
                }
            }
        }
    }
}