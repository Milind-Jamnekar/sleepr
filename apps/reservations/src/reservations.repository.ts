import { AbstractRepository } from '@app/common/database/abstract.repository';
import { Reservation } from './entities/reservation.schema';
import { Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export class ReservationsRepository extends AbstractRepository<Reservation> {
  protected readonly logger = new Logger(ReservationsRepository.name);

  constructor(
    @InjectModel(Reservation.name)
    reservationModel: Model<Reservation>,
  ) {
    super(reservationModel);
  }
}
