import { Component, EventEmitter, Input, Output } from '@angular/core'

import {
  BadgeComponent,
  DropdownMultiselectComponent,
} from '@geonetwork-ui/ui/inputs'
import { TranslatePipe, TranslateService } from '@ngx-translate/core'
import { INSPIRE_TOPICS } from '../../../../fields.config'

@Component({
  selector: 'gn-ui-form-field-topics',
  standalone: true,
  imports: [BadgeComponent, TranslatePipe, DropdownMultiselectComponent],
  templateUrl: './form-field-topics.component.html',
  styleUrl: './form-field-topics.component.css',
})
export class FormFieldTopicsComponent {
  topics = []
  @Input() set value(topics: string[]) {
    this.topics = topics
  }
  @Output() valueChange: EventEmitter<string[]> = new EventEmitter()
  availableTopics = INSPIRE_TOPICS.map((topic) => {
    return {
      label: this.translateService.instant(topic.label),
      value: topic.value,
    }
  })

  constructor(private translateService: TranslateService) {}

  handleItemSelection(selectedItems: string[]) {
    this.topics = selectedItems
    this.valueChange.emit(this.topics)
  }

  removeTopic(topic: string) {
    this.topics = this.topics.filter((t) => t !== topic)
    this.valueChange.emit(this.topics)
  }

  getTranslatedTopic(topic: string) {
    const topicKey = this.availableTopics.find(
      (avail) => avail.value === topic
    )?.label
    return topicKey ? this.translateService.instant(topicKey) : ''
  }
}
