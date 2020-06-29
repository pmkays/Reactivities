using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistance;

namespace Application.Activities
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid Id {get; set;}
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
                var activity = await _context.Activities.FindAsync(request.Id);

                if(activity == null)
                {
                    throw new Exception("Couldn't find activity.");
                }

                _context.Remove(activity);

                //doing > 0 converts int to bool
                var success = await _context.SaveChangesAsync() > 0;

                if(success)
                {
                    return Unit.Value;
                }
                else
                {
                    throw new Exception("This activity could not be deleted");
                }
            }
        }
    }
}