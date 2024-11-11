import { Injectable } from '@angular/core'
import { ConfirmationService, MessageService } from 'primeng/api'

@Injectable({ providedIn: 'root' })
export class UtilitiesService {

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  notifySuccess(message: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: '' + message
    })
  }

  notifyError(message: string): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: '' + message
    })
  }

  notifyInfo(message: string): void {
    this.messageService.add({
      severity: 'info',
      summary: 'Info',
      detail: '' + message
    })
  }

  notifyWarn(message: string): void {
    this.messageService.add({
      severity: 'warn',
      summary: 'Warning',
      detail: '' + message
    })
  }

  confirmDialog(message: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.confirmationService.confirm({
        message: message,
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => resolve(true),
        reject: () => resolve(false)
      })
    })
  }
}
