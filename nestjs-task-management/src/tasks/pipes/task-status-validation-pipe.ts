import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../task.model';

export class TaskStatusValidationPipe implements PipeTransform {
  //We establish the allowed statuses
  readonly allowedStatuses = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE,
  ];

  transform(value: any) {
    value = value.toUpperCase();
    //console.log('value', value);

    if (!this.isStatusValid(value)) {
      //if value not valid throw exception
      throw new BadRequestException(`"${value}" is an invalid status`);
    }
    //otherwise(if status us valid)
    return value;
  }

  private isStatusValid(status: any) {
    const idx = this.allowedStatuses.indexOf(status); // indexOf is going to return -1 if the status we provide does not exist inside the array
    return idx !== -1; //returns true o false depending if the value is inside the array or not.
  }
}
