import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ReportService } from './report.service';
import { JwtGuard, RolesGuard } from 'src/auth/guard';
import { HasRoles } from 'src/auth/decorator/has-roles.decorator';
import { roles } from 'src/auth/dto/enums';

@UseGuards(JwtGuard, RolesGuard)
@Controller('report')
export class ReportController {
  constructor(private reportService: ReportService) {}

  @Get('daily')
  @HasRoles(roles.norAdmin)
  fetchDailyReport() {
    return this.reportService.fetchDailyReport();
  }

  @Get('filtered')
  @HasRoles(roles.norAdmin)
  fetchFilteredReport(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.reportService.fetchFilterByDateRange(startDate, endDate);
  }
}
